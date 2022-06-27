import express from "express";
import userJoiSchema from "../schemas/user.mongoose";
import userMongooseSchema from "../schemas/user.mongoose";
import Joi from 'joi'
const app = express();

app.post("/add-user", async (request, response) => {
  // why ts is being a bitch here
  // const validation = await userJoiSchema.validate(request.body);
  // console.log(validation)
  // validation.error ? response.status(500).send("validation.error") : null;
  Joi.validate(request.body, userJoiSchema)
  // const user = new userMongooseSchema(request.body);
  // try {
  //   await user.save();
  //   response.send(user);
  // } catch (error) {
  //   if (error instanceof Error) {
  //     response.status(500).send(error.message);
  //   } else {
  //     console.log('Unexpected error', error);
  //   }
  // }
});

app.get("/users", async (request, response) => {
  const users = await userMongooseSchema.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default app