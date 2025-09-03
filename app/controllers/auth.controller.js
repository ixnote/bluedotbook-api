import { login, register } from "../services/auth.service.js";
import ErrorResponse from "../shared/utils/errorResponse.js";
import {
  loginValidator,
  registerValidator,
} from "../shared/validators/auth.validators.js";
import asyncHandler from "../shared/middleware/async.js";

export const registerController = asyncHandler(async (req, res, next) => {
  const { error } = await registerValidator.validateAsync(req.body);
  if (error) {
    return next(new ErrorResponse(error.message, 400));
  } else {
    await register(req, res, next);
  }
});

export const loginController = asyncHandler(async (req, res, next) => {
  const { error } = await loginValidator.validateAsync(req.body);
  if (error) {
    return next(new ErrorResponse(error.message, 400));
  } else {
    await login(req, res, next);
  }
});
