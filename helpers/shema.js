const Joi = require("joi");

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

const changeSchema = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string()
  });

  return schema.validate(data);
};

module.exports = { addSchema, changeSchema };