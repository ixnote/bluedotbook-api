import {
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
  deleteProduct,
  createCategory,
  getCategories,
  getSingleCategory,
  editCategory,
  deleteCategory,
  getUserProduct,
} from "../services/product.service.js";
import {
  createProductValidator,
  updateProductValidator,
  createCategoryValidator,
} from "../shared/validators/product.validators.js";
import asyncHandler from "../shared/middleware/async.js";
import ErrorResponse from "../shared/utils/errorResponse.js";

export const createProductController = asyncHandler(async (req, res, next) => {
  const { error } = await createProductValidator.validateAsync(req.body);
  if (error) {
    return next(new ErrorResponse(error.message, 400));
  } else {
    const product = await createProduct(req, res, next);
    return res.status(201).json(product);
  }
});

export const updateProductController = asyncHandler(async (req, res, next) => {
  const { error } = await updateProductValidator.validateAsync(req.body);
  if (error) {
    return next(new ErrorResponse(error.message, 400));
  } else {
    const product = await updateProduct(req, res, next);
    return res.status(200).json(product);
  }
});

export const getUserProductsController = asyncHandler(
  async (req, res, next) => {
    const product = await getUserProduct(req, res, next);
    return res.status(200).json(product);
  }
);

export const getProductsController = asyncHandler(async (req, res, next) => {
  const product = await getProducts(req, res, next);
  return res.status(200).json(product);
});

export const getSingleProductController = asyncHandler(
  async (req, res, next) => {
    const product = await getProduct(req, res, next);
    return res
      .status(200)
      .json({ success: true, message: "Product fetched", data: product });
  }
);

export const deleteProductController = asyncHandler(async (req, res, next) => {
  const product = await deleteProduct(req, res, next);
  return res.status(200).json(product);
});

export const createCategoryController = asyncHandler(async (req, res, next) => {
  const { error } = await createCategoryValidator.validateAsync(req.body);
  if (error) {
    return next(new ErrorResponse(error.message, 400));
  } else {
    const product = await createCategory(req, res, next);
    return res.status(200).json(product);
  }
});

export const getCategoriesController = asyncHandler(async (req, res, next) => {
  const categories = await getCategories(req, res, next);
  return res.status(200).json(categories);
});

export const getCategoryController = asyncHandler(async (req, res, next) => {
  const category = await getSingleCategory(req, res, next);
  return res
    .status(200)
    .json({ success: true, message: "Category fetched", data: category });
});

export const editCategoryController = asyncHandler(async (req, res, next) => {
  const category = await editCategory(req, res, next);
  return res.status(200).json(category);
});

export const deleteCategoryController = asyncHandler(async (req, res, next) => {
  const category = await deleteCategory(req, res, next);
  return res.status(200).json(category);
});
