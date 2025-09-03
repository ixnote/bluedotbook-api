import dotenv from "dotenv";
import asyncHandler from "../shared/middleware/async.js";
import ErrorResponse from "../shared/utils/errorResponse.js";
import { pageCount, paginate, search } from "../shared/utils/index.js";
import { userAppearance } from "../shared/utils/constants.js";
import { GalleryModel } from "../shared/models/order.model.js";

dotenv.config();

export const createGallery = asyncHandler(async (req, res, next) => {
  const user = req.user;
  console.log("🚀 ~ BlogService ~ create ~ GalleryDto:", req.body);
  const newGallery = new GalleryModel(req.body);
  newGallery.author = user._id;
  await newGallery.save();

  return {
    success: true,
    message: "Gallery created successfully",
    data: newGallery,
  };
});

export const updateGallery = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const gallery = await GalleryModel.findOne({ _id: id });

  if (!gallery) {
    return next(new ErrorResponse("Gallery not found", 404));
  }

  for (const value in body) {
    gallery[value] = body[value];
  }

  await gallery.save();

  return {
    success: true,
    message: "Gallery updated successfully",
    data: gallery,
  };
});

export const getGallery = asyncHandler(async (req, res, next) => {
  const params = req.query;
  const { page = 1, pageSize = 20, author, ...rest } = req.query;

  const pagination = await paginate({ page, pageSize });

  const query = await search(rest);
  if (author) query.author = author;

  const gallery = await GalleryModel.find(query)
    .skip(pagination.offset)
    .limit(pagination.limit)
    .sort({ createdAt: -1 })
    .exec();

  const count = await GalleryModel.countDocuments(query).exec();

  return {
    success: true,
    pagination: {
      ...(await pageCount({ count, page, pageSize })),
      total: count,
    },
    data: gallery,
  };
});

export const getSingleGallery = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const gallery = await GalleryModel.findOne({ _id: id });
  if (!gallery) {
    return next(new ErrorResponse("Gallery not found", 404));
  }

  return gallery;
});

export const deleteGallery = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  const gallery = await GalleryModel.deleteMany({
    _id: id,
    author: user._id,
  });

  if (!gallery) {
    return next(new ErrorResponse("Gallery not found", 404));
  }

  return {
    success: true,
    message: "Gallery deleted",
  };
});
