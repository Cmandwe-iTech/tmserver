import { compare, hashpassword } from "../middlware/helper.js";
import userModel from "../userModel/userModel.js";

export const register = async (req, res) => {
  try {
    const { email, phone, password, role } = req.body;
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(400).send({message:"User already exists, please login"});
    } else {
      const hash = await hashpassword(password);
      const newuser = new userModel({
        email,
        phone,
        password: hash,
        role,
      });
      const userSave = await newuser.save();
      console.log(userSave);
      res.status(200).send({ message: "User registered", user: userSave });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const login = async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;
    console.log(email, password)
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("User does not exist, please sign up first");
    } else {
      const match = await compare(password, user.password);
      if (match) {
        const token = await user.generatetoken();
        res.status(200).send({ token, user });
        console.log(token);
      }else{
      return res.status(400).send({message:"plz check your credentials"});
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, phone, password, role } = req.body;
    const hash = await hashpassword(password);

    const userDataById = await userModel.findById(id);
    if (!userDataById) {
      return res.status(404).json({ error: "user not found" });
    }
    userDataById.email = email || userDataById.email;
    userDataById.phone = phone || userDataById.phone;
    userDataById.password = hash || userDataById.password;
    userDataById.role = role || userDataById.role;
    await userDataById.save();

    res.status(200).send({message:"user details updated successfully",userDataById});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAllusers = async (req, res) => {
  try {
    const allUsers = await userModel.find().sort({ createdAt: -1 });
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await userModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).send({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

