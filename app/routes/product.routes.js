import express from "express";
import * as product from "../controllers/product.controller.js";
import { isAuthenticated } from "../shared/middleware/auth.jwt.js";
const productRouter = express.Router();

productRouter
  .post("/", [isAuthenticated], product.createProductController)
  .post("/categories", [isAuthenticated], product.createCategoryController)
  .get("/", product.getProductsController)
  .get("/categories", product.getCategoriesController)
  .get("/:id", product.getSingleProductController)
  .get("/categories/:id", product.getCategoryController)
  .put("/:id", [isAuthenticated], product.updateProductController)
  .put("/categories/:id", [isAuthenticated], product.editCategoryController)
  .delete("/:id", [isAuthenticated], product.deleteProductController)
  .delete(
    "/categories/:id",
    [isAuthenticated],
    product.deleteCategoryController
  );
export default productRouter;
