import passport from "passport";
import asyncHandler from "./async.js";
import ErrorResponse from "../utils/errorResponse.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(new ErrorResponse("Unauthorized access", 401));
    } else {
      return next(); // continue to next middleware if no error.
    }
  })(req, res, next);
});
