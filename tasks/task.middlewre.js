const joi = require("joi");

const ValidateTaskCreation = async (req, res, next) => {
  try {
    const schema = joi.object({
      title: joi.string().required(),
      status: joi.string().required(),
      user_id: joi.string().required(),
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

module.exports = {
  ValidateTaskCreation,
};
