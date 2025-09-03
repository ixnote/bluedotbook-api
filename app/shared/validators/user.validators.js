import Joi from "joi";

export const updateUserValidator = Joi.object({
  fullname: Joi.string().trim().min(6),
});
