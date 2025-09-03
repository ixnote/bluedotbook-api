import {
  addToCart,
  getCart,
  getSingleCartItem,
  removeItem,
  updateCartItem,
} from "../services/cart.service.js";
import {
  addToCartValidator,
  updateCartValidator,
} from "../shared/validators/cart.validator.js";
import asyncHandler from "../shared/middleware/async.js";
import ErrorResponse from "../shared/utils/errorResponse.js";

export const addToCartController = asyncHandler(async (req, res, next) => {
  const { error } = await addToCartValidator.validateAsync(req.body);
  if (error) {
    return next(new ErrorResponse(error.message, 400));
  } else {
    const cart = await addToCart(req, res, next);
    return res.status(201).json(cart);
  }
});

export const updateCartItemController = asyncHandler(async (req, res, next) => {
  const { error } = await updateCartValidator.validateAsync(req.body);
  if (error) {
    return next(new ErrorResponse(error.message, 400));
  } else {
    const cart = await updateCartItem(req, res, next);
    return res.status(200).json(cart);
  }
});

export const getCartController = asyncHandler(async (req, res, next) => {
  const cart = await getCart(req, res, next);
  return res.status(200).json(cart);
});

export const getSingleCartItemController = asyncHandler(
  async (req, res, next) => {
    const cart = await getSingleCartItem(req, res, next);
    return res
      .status(200)
      .json({ success: true, message: "Cart fetched", data: cart });
  }
);

export const removeCartItemController = asyncHandler(async (req, res, next) => {
  const cart = await removeItem(req, res, next);
  return res.status(200).json(cart);
});
