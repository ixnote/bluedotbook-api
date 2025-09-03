import Joi from "joi";

export const createCategoryValidator = Joi.object({
  name: Joi.string().min(3).required(),
});

export const createProductValidator = Joi.object({
  name: Joi.string().min(3).required(),
  imageUrl: Joi.string().uri().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  currency: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

export const updateProductValidator = Joi.object({
  inStock: Joi.boolean().optional(),
  name: Joi.string().min(3).optional(),
  imageUrl: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  currency: Joi.string(),
  price: Joi.number().optional(),
  quantity: Joi.number().optional(),
});
