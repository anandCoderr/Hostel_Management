import { errorHelper } from "../Helper/globalHelper.js";

import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    // console.log("req.headers:---->", req.headers);

    if (!token) {
      return errorHelper(res, { status: 401, message: "Not Authenticated" });
    }

    jwt.verify(
      token.replace("Bearer ", ""),
      process.env.PRIVATE_KEY,
      (err, decoded) => {
        if (err) {
          return errorHelper(res, { status: 401, message: "Invalid token" });
        }
        // console.log("data, decoded:--->", decoded);
        req.userId = decoded.userId;
        next();
      }
    );
  } catch (error) {
    return errorHelper(res, error);
  }
};
