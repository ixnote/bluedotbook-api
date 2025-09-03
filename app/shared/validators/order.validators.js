import Joi from "joi";

export const createOrderValidator = Joi.object({
  items: Joi.array().items(Joi.string()),
});
