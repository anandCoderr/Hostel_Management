import userModel from "../Model/UserModel.js";
import MenuModel from "../Model/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  successHelper,
  errorHelper,
  inputValidator,
} from "../Helper/globalHelper.js";

import { imgToURL } from "../Utils/imgToUrl.js";

// import constantInstances from "../Constants/instants.js";

export const register = async (req, res) => {
  console.log("Req body =====> ", req.body);

  const { name, phoneNumber, email, password } = req.body;
  const profilePicture = req.file && imgToURL(req.file);

  console.log("profilePicture:----->", profilePicture);

  console.log("req.body:---->", req.body);

  try {
    // ------------ input validator work
    const rules = {
      name: "required",
      phoneNumber: "required",
      email: "required",
      password: "required",
    };

    const validatorRes = await inputValidator(req.body, rules);

    console.log("validatorRes----------->", validatorRes);

    if (!validatorRes.success) {
      return errorHelper(res, validatorRes.errors);
    }

    // --checking user is already available or not

    const userResp = await userModel.findOne({ phoneNumber, email });

    if (userResp) {
      return errorHelper(res, {
        status: 422,
        message: "User is already Available",
      });
    }

    // ------------ creating user model

    const userPic = profilePicture?.length ? profilePicture : "";

    const userCreation = userModel({
      name,
      phoneNumber,
      email,
      password,
      profilePicture: userPic,
    });

    await userCreation.save();

    // if user created then this below console will run

    console.log("userCreation:-", userCreation);
    return successHelper(res, "user created Successful", 200, userCreation);
  } catch (error) {
    // this catch will run every time when any error will occur in try block
    return errorHelper(res, error);
  }
};

// -----------user login

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const rules = {
    email: "required",
    password: "required",
  };

  try {
    const validatorResponse = await inputValidator(req.body, rules);

    if (!validatorResponse.success) {
      return errorHelper(res, validatorResponse.errors);
    }

    const userCheckResponse = await userModel.findOne({ email });

    console.log("userCheckResponse: just checked userEmail", userCheckResponse);

    if (!userCheckResponse) {
      return errorHelper(res, {
        status: 422,
        message: "Email or Password is Invalid",
      });
    }

    // -----bcrypt operation
    // Note: whenever we perform any bcrypt.Compare operation and given password is valid
    // then it always returns "true" as a response
    // and if password compare is not valid then it returns "false"
    // so the basis of true and false we always show response to user.
    const passwordBcryptResponse = await bcrypt.compare(
      password,
      userCheckResponse?.password
    );

    // console.log(
    //   "passwordBcryptResponse: crypt compare response",
    //   passwordBcryptResponse
    // );

    if (!passwordBcryptResponse) {
      return errorHelper(res, {
        status: 422,
        message: "Email or Password is Invalid",
      });
    }

    // const isValidUser = await userModel.findOne({
    //   email,
    //   password: passwordBcryptResponse,
    // });

    // console.log("isValidUser response:--->", isValidUser);

    const jwtResponse = await jwt.sign(
      { userId: userCheckResponse._id },
      process.env.PRIVATE_KEY
    );

    return successHelper(res, "Logged in Successful", 201, {
      data: userCheckResponse,
      jwtToken: jwtResponse,
    });
  } catch (error) {
    return errorHelper(res, error);
  }
};

// ------user can see menu

export const getMenu = async (req, res) => {
  try {
    const findResponse = await MenuModel.find({});

    return successHelper(res, "Your data", 200, findResponse);
  } catch (error) {
    return errorHelper(res, error);
  }
};
