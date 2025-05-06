import {
  register,
  userLogin,
  verifyOtp,
  likeAndDislikeFun,
} from "../Controllers/userController.js";
import express from "express";
import uploadAny from "../Helper/imgUploadHelper.js";
import { getMenu } from "../Controllers/userController.js";

// -------middleware importing to perform operation
import { authMiddleware } from "../Middlewares/authVerifyMiddleware.js";

const route = express.Router();

// -----------post route

route.post("/create-user", uploadAny.single("profilePicture"), register);

route.post("/user-login", userLogin);

route.post("/otp-verification", verifyOtp);

// --------like and dislike operation

route.post("/menu/likeAndDislike", authMiddleware, likeAndDislikeFun);

// -------------- get requests

route.get("/get-meal", authMiddleware, getMenu);

export default route;
