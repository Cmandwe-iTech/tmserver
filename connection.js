import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const conn =  mongoose.connect(process.env.MONGODB_URL).then((res)=>{
    console.log("DB Connected Successfully..!!")
}) 
