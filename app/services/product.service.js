import dotenv from "dotenv";
import asyncHandler from "../shared/middleware/async.js";
import ErrorResponse from "../shared/utils/errorResponse.js";
import {
  globalSearch,
  pageCount,
  paginate,
  search,
} from "../shared/utils/index.js";
import { ProductModel } from "../shared/models/product.model.js";
import { CategoryModel } from "../shared/models/category.model.js";

dotenv.config();

export const createProduct = asyncHandler(async (req, res, next) => {
  const user = req.user;
  console.log("🚀 ~ BlogService ~ create ~ productDto:", req.body);
  const newProduct = new ProductModel(req.body);
  newProduct.user = user._id;
  await newProduct.save();

  return {
    success: true,
    message: "Product created successfully",
    data: newProduct,
  };
});

export const getUserProduct = asyncHandler(async (req, res, next) => {
  const { page = 1, pageSize = 50, ...rest } = req.query;

  const pagination = await paginate({ page, pageSize });
  const product = await ProductModel.find({ user: user._id })
    .populate([
      {
        path: "user",
        select: "fullname username email",
      },
      {
        path: "category",
        select: "_id name",
      },
    ])
    .skip(pagination.offset)
    .limit(pagination.limit)
    .sort({ createdAt: -1 })
    .exec();

  return {
    success: true,
    message: "Product fetch successfully",
    data: product,
  };
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const product = await ProductModel.findOne({ _id: id, user: req.user._id });

  if (!product) {
    return next(new ErrorResponse("Product not found", 404));
  }

  for (const value in body) {
    product[value] = body[value];
  }

  await product.save();

  return {
    success: true,
    message: "Product updated successfully",
    data: product,
  };
});

export const getProducts = asyncHandler(async (req, res, next) => {
  const params = req.query;
  const { page = 1, pageSize = 20, user, ...rest } = req.query;

  const pagination = await paginate({ page, pageSize });

  const query = await search(rest);
  if (user) query.user = user;

  const products = await ProductModel.find(query)
    .populate([
      {
        path: "user",
        select: "fullname username email",
      },

      { path: "category", select: "_id name" },
    ])
    .skip(pagination.offset)
    .limit(pagination.limit)
    .sort({ createdAt: -1 })
    .exec();

  const count = await ProductModel.countDocuments(query).exec();

  return {
    success: true,
    pagination: {
      ...(await pageCount({ count, page, pageSize })),
      total: count,
    },
    data: products,
  };
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findOne({ _id: id }).populate([
    {
      path: "user",
      select: "fullname username email",
    },
    { path: "category", select: "_id name" },
  ]);
  if (!product) {
    return next(new ErrorResponse("Product not found", 404));
  }

  return product;
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  await ProductModel.deleteOne({
    _id: id,
    user: user._id,
  });

  return {
    success: true,
    message: "Product deleted",
  };
});

export const createCategory = asyncHandler(async (req, res, next) => {
  const category = req.body;
  const newCategory = await CategoryModel.findOneAndUpdate(
    { name: await globalSearch(category.name) },
    {
      ...category,
    },
    {
      upsert: true,
      setDefaultsOnInsert: true,
      new: true,
    }
  );
  return {
    success: true,
    message: "Category created successfully",
    data: newCategory,
  };
});

export const getCategories = asyncHandler(async (req, res, next) => {
  const params = req.query;
  const query = await search(params);
  const categories = await CategoryModel.find(query).select("id name").exec();

  return {
    success: true,
    message: "Categories fetched successfully",
    data: categories,
  };
});

export const getSingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findOne({ _id: id }).exec();
  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  return {
    success: true,
    message: "Category fetched successfully",
    data: category,
  };
});

export const editCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const category = await CategoryModel.findById(id).exec();
  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  for (const value in body) {
    category[value] = body[value];
  }

  await category.save();

  return {
    success: true,
    message: "category updated successfully",
    data: category,
  };
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoryModel.findById(id).exec();

  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  await category.remove();
  return {
    success: true,
    message: "categories deleted successfully",
  };
});
