const Joi = require('joi');

const articleValidator = Joi.object({
    imageUrl: Joi.string().required(),
    name: Joi.string().required(),
    latinName: Joi.string().required(),
    family: Joi.string().required(),
    description: Joi.string().required(),
    ingredient: Joi.string().required(),
    efficacy: Joi.array().items(Joi.string()),
    codeIdentity: Joi.number().required(),
});

module.exports = articleValidator;