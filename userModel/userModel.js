import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretkey = process.env.KEY;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  role: {
    type: Number,
    default: 0,
  },
});

UserSchema.methods.generatetoken = function () {
  try {
    let usertoken = jwt.sign({ _id: this._id }, secretkey);
    return usertoken;
  } catch (error) {
    console.log(error);
  } 
};

const userModel = mongoose.model("user", UserSchema);
export default userModel;
