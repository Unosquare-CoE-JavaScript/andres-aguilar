const Joi = require('joi');

module.exports.createProductSchema = Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    brand: Joi.string().required()
});

module.exports.getAllProductsSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateProductSchema = Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    brand: Joi.string()
})