import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const url=process.env.DB_URL;
const DBConnect=async()=>{
    try{
      await mongoose.connect(url);
      console.log("DB Connected")
    }
    catch(err){
     console.log("DB ERROR",err.message)
    }
}
export default DBConnect;