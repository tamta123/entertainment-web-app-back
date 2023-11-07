import Joi from "joi";

const validator = (Schema) => (payload) =>
  Schema.validate(payload, { abortEarly: false });

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
  confirmPassword: Joi.ref("password"),
});

export const validateUser = validator(userSchema);
