import express from "express";
import * as user from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter
  .put("/", user.updateUserController)
  .get("/:id", user.getUserController)
  .get("/", user.getUsersController);
export default userRouter;
