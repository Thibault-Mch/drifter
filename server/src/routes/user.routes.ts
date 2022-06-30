import express from "express";
import { createUser } from "../controllers/user.controller";
import userMongooseSchema from "../schemas/user.mongoose";

const app = express();

app.post("/add-user", async (request, response) => {
  const newUser = createUser(request.body)
  try {
    await newUser.save();
    response.send(newUser);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
});

app.get("/users", async (request, response) => {
  const users = await userMongooseSchema.find({});

  try {
    response.send(users);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
});

export default app