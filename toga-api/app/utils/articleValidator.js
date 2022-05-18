const Joi = require('Joi');

const articleValidasi = Joi.object({
    imageUrl: Joi.string().required(),
    name: Joi.string().required(),
    latinName: Joi.string().required(),
    family: Joi.string().required(),
    description: Joi.string().required(),
    ingredient: Joi.string().required(),
    efficacy: Joi.array().items(Joi.string()),
});

module.export = articleValidasi;