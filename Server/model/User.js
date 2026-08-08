import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true  
    },
    userId: {
        type: String,
        required: true,
        trim: true,
        unique: true   
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        match: /^[0-9]{10}$/   
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/  
    },
    password: {
        type: String,
        required: true,
        minlength: 8   
    },
    role: {
        type: String,
        enum: ["admin", "student", "teacher"],
        default: "student"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);