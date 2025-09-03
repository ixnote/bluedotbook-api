import Joi from "joi";

export const addToCartValidator = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
});

export const updateCartValidator = Joi.object({
  cartId: Joi.string().required(),
  quantity: Joi.number().required(),
  type: Joi.string().valid("increase", "decrease").required(),
});
