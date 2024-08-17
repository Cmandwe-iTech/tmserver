import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../userModel/userModel.js";
dotenv.config();

export const authlogin = async (req, res, next) => {
  try {
    const decode = await Jwt.verify(req.headers.authorization, process.env.KEY);
    req.user = decode;
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const Super_Admin = async (req, res, next) => {
  try {
    const userdata = await userModel.findById(req.user._id);
    console.log(userdata.role);
    if (userdata.role === 1) {
      next();
    } else {
      console.log("ok");
      return res.status(400).send({ message: "unauthorized access" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const Super_Admin_or_Admin = async (req, res, next) => {
  try {
    const userdata = await userModel.findById(req.user._id);
    console.log(userdata.role);
    if (userdata.role === 1 || userdata.role === 2) {
      next();
    } else {
      console.log("ok");
      return res.status(400).send({ message: "unauthorized access" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const Super_Admin_or_Admin_Hr_Executive = async(req, res, next)=>{
  try {
    const userdata = await userModel.findById(req.user._id);
    console.log(userdata.role);
    if (userdata.role === 1 || userdata.role === 2 || userdata.role === 3) {
      next();
    } else {
      console.log("ok");
      return res.status(400).send({ message: "unauthorized access" });
    }
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}


export const Super_Admin_Or_Admin_Or_SalesExecutive = async (req, res, next) => {
  try {
    const userdata = await userModel.findById(req.user._id);
    console.log(userdata.role);
    if (userdata.role === 1 || userdata.role === 2 || userdata.role === 4) {
      next();
    } else {
      console.log("ok");
      return res.status(400).send({ message: "unauthorized access" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

