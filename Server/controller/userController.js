import User from "../model/User.js"
import fs from "fs";
import sendMail from "../utils/sendMail.js";
import { generatePassword } from "../utils/generatePassword.js";
import { accountCreatedTemplate } from "../utils/emailTemplates.js";
import csv from "csv-parser";
import bcrypt from "bcrypt";
const getAllUsers=async(req,res)=>{
  try{
       const users=await User.find();
       res.status(200).json({message: "users list",users})
  }
  catch(err){
    console.log("Server Error",err.message);
    res.status(500).json({message: "Server Error"})
  }
}
const getUser=async(req,res)=>{
  try{
       const id=req.params.id;
       const user=await User.findOne({userId: id});
       if(!user)
       {
        return res.status(401).json({message: "user id not found"})
       }
       res.status(200).json({message: "user found",user})
  }
  catch(err){
    console.log("Server Error",err.message);
    res.status(500).json({message: "Server Error"})
  }
}
// ================= GET STUDENTS =================
export const getStudents = async (
  req,
  res
) => {
  try {
    const students =
      await User.find({
        role: "student",
      }).select("-password");

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });

  } catch (err) {
    console.log(
      "Server Error",
      err.message
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ================= GET TEACHERS =================
export const getTeachers = async (
  req,
  res
) => {
  try {
    const teachers =
      await User.find({
        role: "teacher",
      }).select("-password");

    res.status(200).json({
      success: true,
      count: teachers.length,
      teachers,
    });

  } catch (err) {
    console.log(
      "Server Error",
      err.message
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const bulkUploadUsers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file required" });
    }

    const users = [];

    // read CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        users.push(row);
      })
      .on("end", async () => {
        try {
          const createdUsers = [];

          for (let u of users) {
            const password =generatePassword(12);
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
              name: u.name,
              userId: Date.now(),
              email: u.email,
              password: hashedPassword,
              role: u.role || "student",
              mobile: u.mobile,
              isActive: true,
            });
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
            createdUsers.push(user);
          }

          // delete file after processing
          fs.unlinkSync(req.file.path);

          res.json({
            message: "Bulk upload successful",
            count: createdUsers.length,
          });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createUser=async(req,res)=>{
  try{
       const {name,mobile,email}=req.body;
       if (!name || !mobile || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // if (password.length < 6) {
    //   return res.status(400).json({ message: "Password must be at least 6 characters" });
    // }
     const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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
       res.status(200).json({message: "user created",user})
  }
  catch(err){
    console.log("Server Error",err.message);
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email or UserID already exists"
      });
    }
    res.status(500).json({message: "Server Error"})
  }
}
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, mobile,role } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, mobile,role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated", user });

  } catch (err) {
    console.error("Server error",err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive; // ✅ toggle
    await user.save();

    res.json({
      message: `User ${user.isActive ? "activated" : "deactivated"}`,
      user,
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export {getAllUsers,getUser,createUser,getProfile}