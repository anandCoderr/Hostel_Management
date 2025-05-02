import {
  register,
  userLogin,
  verifyOtp,
} from "../Controllers/userController.js";
import express from "express";
import uploadAny from "../Helper/imgUploadHelper.js";
import { getMenu } from "../Controllers/userController.js";

const route = express.Router();

// -----------post route

route.post("/create-user", uploadAny.single("profilePicture"), register);

route.post("/user-login", userLogin);

route.post("/otp-verification", verifyOtp);

// -------------- get requests

route.get("/get-meal", getMenu);

export default route;
