// import userModel from "../Model/UserModel.js";
// import {
//   successHelper,
//   errorHelper,
//   inputValidator,
// } from "../Helper/globalHelper.js";

// import constantInstances from "../Constants/instants.js";

// const register = async (req, res) => {
//   console.log("Req body ", req.body);
//   const { name, phoneNumber, email, password } = req.body;
//   const profilePicture =
//     req.file && Object.keys(req.file).length ? req.file : "";

//   console.log("profilePicture:----->", profilePicture);

//   console.log("req.body:---->", req.body);

//   try {
//     // ------------ input validator work
//     const rules = {
//       name: "required",
//       phoneNumber: "required",
//       email: "required",
//       password: "required",
//     };

//     const validatorRes = await inputValidator(req.body, rules);

//     if (!validatorRes.success) {
//       return errorHelper(res, validatorRes.errors);
//     }

//     // ------------ creating user model

//     const userPic = profilePicture
//       ? `${constantInstances.backendImgPath}/${profilePicture?.filename}`
//       : "";

//     const userCreation = userModel({
//       name,
//       phoneNumber,
//       email,
//       password,
//       // profilePicture: `${constantInstances.backendImgPath}/${
//       //   profilePicture?.filename || ""
//       // }`,
//       profilePicture: userPic,
//     });

//     await userCreation.save();

//     // if user created then this below console will run

//     console.log("userCreation:-", userCreation);
//     return successHelper(res, "user created Successful", 200, userCreation);
//   } catch (error) {
//     // this catch will run every time when any error will occur in try block
//     return errorHelper(res, error);
//   }
// };

// export { register };

// -----CHecking new code----------------------------------

import userModel from "../Model/UserModel.js";
import {
  successHelper,
  errorHelper,
  inputValidator,
} from "../Helper/globalHelper.js";

import { imgToURL } from "../Utils/imgToUrl.js";

// import constantInstances from "../Constants/instants.js";

const register = async (req, res) => {
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

export { register };
