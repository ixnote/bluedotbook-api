import express from "express";
import * as auth from "../controllers/auth.controller.js";
import verify from "../shared/middleware/verify.js";
const authRouter = express.Router();

authRouter
  .post(
    "/register",
    [verify.checkDuplicateEmail, verify.checkDuplicateUsername],
    auth.registerController
  )
  .post("/login", auth.loginController);
export default authRouter;
