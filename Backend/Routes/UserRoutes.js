import { register } from "../Controllers/userController.js";
import express from "express";
import uploadAny from "../Helper/imgUploadHelper.js";

const route = express.Router();

route.post("/create-user", uploadAny.single("profilePicture"), register);

// route.post("/create-user", uploadAny.array("profilePicture", 5), register);

// route.post("/create-user", register);

export default route;
