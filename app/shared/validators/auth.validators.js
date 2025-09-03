import Joi from "joi";

export const registerValidator = Joi.object({
  fullname: Joi.string().min(3).required(),
  email: Joi.string()
    .min(3)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().trim().min(6).max(50).required(),
});

export const loginValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().trim().required(),
});
