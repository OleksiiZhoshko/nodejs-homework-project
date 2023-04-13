const { changeSchema } = require("../helpers/shema");

const putValidate = (req, res, next) => {
  const bodyIsValid = changeSchema(req.body);
  if (bodyIsValid.error) {
        res.status(400).json({
          message: 'Please enter valid data',
        });
    return;
  }
  next();
};


module.exports = putValidate;