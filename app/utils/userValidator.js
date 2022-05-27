const Joi = require("joi");

const userValidator = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
});

module.exports = userValidator;
