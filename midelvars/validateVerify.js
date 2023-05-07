const Joi = require("joi");

const validateVerify = (req, res, next) => {
  const { error } = userValidate(req.body);
  if (error) {
    const fieldWithError = error.details[0].path[0];
    const errorType = error.details[0].type;

    switch (errorType) {
      case "string.min":
        next(res.status(400).json({ messege: `${fieldWithError} must be at least 6 characters` }));
        break;
      case "any.required":
        next(res.status(400).json({ messege: `missing required ${fieldWithError} field` }));
        break;
      case "string.pattern.base":
        if (fieldWithError === "password") {
          next(res.status(400).json({ messege: `Password must include at least one capital letter and one digit` }));
          break;
        }
        next(res.status(400).json({ messege: `please enter a valid ${fieldWithError}` }));
        break;
      case "object.unknown":
        next(res.status(400).json({ messege: `property ${fieldWithError} is not allowed` }));
        break;
      case "string.base":
        next(res.status(400).json({ messege: `property ${fieldWithError} must be a string` }));
        break;
      default:
        break;
    }
    return;
  }
  next();
};

const userValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    subscription: Joi.string(),
  });

  return schema.validate(data);
};

module.exports = validateVerify;