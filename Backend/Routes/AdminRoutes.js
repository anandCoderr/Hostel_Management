import express from "express";
import uploadAny from "../Helper/imgUploadHelper.js";

import { setMenu } from "../Controllers/adminController.js";
const route = express.Router();

route.post("/create-meal", uploadAny.single("mealImg"), setMenu);

export default route;
