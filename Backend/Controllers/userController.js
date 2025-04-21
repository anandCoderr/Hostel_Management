import userModel from "../Model/UserModel.js";
import {
  successHelper,
  errorHelper,
  inputValidator,
} from "../Helper/globalHelper.js";

const register = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;
  const profilePic = req.file || req.files || {};

  const rules = {
    name: "required",
    phoneNumber: "required",
    email: "required",
    password: "required",
  };

  const validatorRes = await inputValidator(req.body, rules);

  if (!validatorRes) {
    return errorHelper(res, validatorRes.errors);
  }
};
