const Joi = require("joi");

const patchValidate = (req, res, next) => {
  const { error } = updateStatusValidate(req.body);

  if (error) {
        res.status(400).json({
          message: "missing field favorite",
        });
    return;
  }
  next();
};

const updateStatusValidate = (data) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  return schema.validate(data);
};

module.exports = patchValidate;