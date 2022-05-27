const Joi = require("joi");

const signInValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = signInValidator;
