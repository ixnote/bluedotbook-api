import express from "express";
import * as cart from "../controllers/cart.controller.js";
import { isAuthenticated } from "../shared/middleware/auth.jwt.js";
const cartRouter = express.Router();

cartRouter
  .post("/", cart.addToCartController)
  .get("/", cart.getCartController)
  .get("/:id", cart.getSingleCartItemController)
  .put("/", cart.updateCartItemController)
  .delete("/:id", cart.removeCartItemController);
export default cartRouter;
