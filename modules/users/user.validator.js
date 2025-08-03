const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .required(),
  password: Joi.string().required()
});

const validator = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await schema.validateAsync({ name,password,email });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validator };
