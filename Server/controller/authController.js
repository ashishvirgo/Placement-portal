import User from "../model/User.js";
import Otp from "../model/Otp.js";
import transporter from "../config/mail.js";
import { generatePassword } from "../utils/generatePassword.js";
import { accountCreatedTemplate } from "../utils/emailTemplates.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendMail from "../utils/sendMail.js";
import { accountPasswordResetTemplate} from "../utils/emailTemplates.js";
dotenv.config();
export const verifyUser = async (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ email:userId });  
    if (!user) {
      return res.status(401).json({ message: "User Id not Found" });
    }
 
    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
    // if (password!==user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
   
    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        userId: user.userId,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.log("Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    console.log("userId=",req.user.id);
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

   
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Change Password Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const forgotPassword= async (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  try {
    const { email } = req.body;
    console.log("email=",email);
    const user = await User.findOne({ email });
    console.log("user=",user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      SECRET_KEY,
      { expiresIn: "15m" }
    );
    console.log("token=",token);
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    console.log("resetLink=",resetLink);
    try {
      await sendMail({
        to: user.email,
        subject:
          "Smart Placement Portal Account Reset Link",
        html: accountPasswordResetTemplate({
          name: user.name,
          resetLink
        }),
      });
    } catch (mailError) {
      console.error(
        "Email sending failed:",
        mailError.message
      );
    }
    res.json({
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
}
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    console.log("decode=",decoded);
    const user = await User.findById(decoded.id);
    console.log("user",user);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.save();

    res.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid or expired reset link",
    });
  }
};




// Send OTP
export const sendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({
        success: false,
        message: "Email required",
      });

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div style="font-family:Arial">
          <h2>Smart Placement Portal</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>Valid for 5 minutes.</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};


// Verify OTP
export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (record.expiresAt < Date.now()) {
      await Otp.deleteOne({ _id: record._id });

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await Otp.deleteOne({ _id: record._id });

    res.json({
      success: true,
      message: "Email verified",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};


// Register User
export const register = async (req, res) => {
  try {
    const { name, mobile, email } = req.body;

    const existing = await User.findOne({
      $or: [{ email }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const password =generatePassword(12);
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser={name,userId: Date.now(),mobile,email,password:hashedPassword};
       const user=await User.create(newUser);
       // Send account creation email
    try {
      await sendMail({
        to: user.email,
        subject:
          "Smart Placement Portal Account Created",
        html: accountCreatedTemplate({
          name: user.name,
          username: user.email,
          password: password,
          role: user.role,
          loginUrl:
            process.env.CLIENT_URL,
        }),
      });
    } catch (mailError) {
      console.error(
        "Email sending failed:",
        mailError.message
      );
    }

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};