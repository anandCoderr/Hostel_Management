import { Validator } from "node-input-validator";

const successHelper = (res, message = "Success", status = 200, data = {}) => {
  return res.status(status).json({
    message,
    status,
    data,
  });
};

const errorHelper = (res, error) => {
  const status = error.status || error.statusCode || 422;
  const message = error.message || "Server Error";

  return res.status(status).json({
    status,
    message,
  });
};

// ------node input validator

const inputValidator = async (body, toValid) => {
  const v = new Validator(body, toValid);

  const matched = await v.check();

  if (!matched) {
    return { statusCode: 421, errors: v.errors }; // Return error messages
  }

  return { success: true }; // Validation passed
};

export { successHelper, errorHelper, inputValidator };
