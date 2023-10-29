const joi = require("joi");

const ValidateUserCreation = async (req, res, next) => {
  try {
    const schema = joi.object({
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
    });
    await schema.validate(req.body, { abortEarly: true });

    next();
  } catch (error) {
    return res.status(422).json({
      message: error.message,
      data: null,
    });
  }
};

const ValidateLogin = async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    });

    await schema.validate(req.body, { abortEarly: true });
  } catch (error) {
    return res.status(422).json({
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  ValidateUserCreation,
  ValidateLogin,
};
