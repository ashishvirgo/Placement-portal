import { Router } from "express"
import { getAllUsers,getUser,createUser,bulkUploadUsers,deleteUser, updateUser, toggleUserStatus, getStudents, getTeachers } from "../controller/userController.js";
import express from "express"
import { upload } from "../middleware/upload.js";
const router=Router();
router.get("/users",getAllUsers);
router.get("/students",getStudents);
router.get("/teachers",getTeachers);
router.get("/:id",getUser);
router.post("/createuser",createUser);
router.post(
  "/bulk-upload",
  upload.single("file"),
  bulkUploadUsers
);
router.put("/edit/:id",updateUser);
router.delete("/delete/:id",deleteUser);
router.patch("/toggle-status/:id", toggleUserStatus);
export default router;