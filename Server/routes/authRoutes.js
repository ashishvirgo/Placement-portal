import express from "express";
import {verifyUser,changePassword,forgotPassword,
   resetPassword,
  sendEmailOtp,
  verifyEmailOtp,
  register,} from "../controller/authController.js"; // your login controller
// import registerUser from "../controller/registerController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
// router.post("/register", registerUser);
router.post("/login", verifyUser);
router.post("/change-password", authMiddleware,changePassword);
router.post("/reset-password", resetPassword);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user
  });
});
router.post("/send-email-otp", sendEmailOtp);
router.post("/verify-email-otp", verifyEmailOtp);
router.post("/register", register);
router.post("/forgot-password",forgotPassword)
export default router;