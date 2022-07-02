import express, { Request, Response } from "express";
import userController from "../controllers/user.controller";
import userMongooseSchema from "../schemas/user.mongoose";

const app = express();

app.post("/add-user", async (request: Request, response: Response) => {
  const newUser = userController.createUser(request.body)
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

app.get("/users", async (request: Request, response: Response) => {
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