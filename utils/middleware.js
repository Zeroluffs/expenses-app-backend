const Joi = require("joi");
module.exports = {
  createUserSchema: function (req, res, next) {
    const register = Joi.object({
      email: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().min(3).max(1024).required(),
    });

    validateRequest(req, next, register, res);
  },
};

function validateRequest(req, next, schema, res) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    req.body = value;
    next();
  }
}
