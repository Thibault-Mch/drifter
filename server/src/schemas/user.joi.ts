import Joi from "joi"

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number(),
});

export default createUserSchema;