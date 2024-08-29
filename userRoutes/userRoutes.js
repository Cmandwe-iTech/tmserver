import express from "express";
const route = express.Router();

import { deleteUser, editUser, getAllusers, login, logout, register } from "../userController/userController.js";
import { authlogin, Super_Admin } from "../middlware/userauth.js";

route.post("/register", register);
route.post("/login", login);
route.post("/logout", authlogin, logout);
route.get("/all-users", authlogin, Super_Admin, getAllusers);
route.delete("/delete-user/:id", authlogin, Super_Admin, deleteUser);
route.put("/update-user/:id", authlogin, Super_Admin, editUser);
export default route;
