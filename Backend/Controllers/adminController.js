import MenuModel from "../Model/AdminModel.js";
import {
  successHelper,
  errorHelper,
  inputValidator,
} from "../Helper/globalHelper.js";

import { imgToURL } from "../Utils/imgToUrl.js";

export const setMenu = async (req, res) => {
  const { day, mealTiming, mealTitle } = req.body;
  const mealImg = req.file;

  const rules = {
    day: "required",
    mealTiming: "required",
    mealTitle: "required",
  };

  try {
    const imgUrlConvertedInstance = imgToURL(mealImg);

    const validatorRes = await inputValidator(req.body, rules);

    if (!validatorRes.success) {
      return errorHelper(res, validatorRes.errors);
    }

    const successRes = await MenuModel.create({
      day,
      type: mealTiming,
      breakfast: {
        image: imgUrlConvertedInstance,
        title: mealTitle,
      },
    });

    if (successRes) {
      console.log("Meal created");
    }

    return successHelper(res, "Meal Created Successful", 200, successRes);
  } catch (error) {
    return errorHelper(res, error);
  }
};
