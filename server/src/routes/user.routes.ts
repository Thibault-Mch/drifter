import express, { NextFunction, Request, Response } from "express";
import userController from "../controllers/user.controller";
import userMongooseSchema from "../schemas/user.mongoose";

const app = express();

app.post("/signup", (request: Request, response: Response, next: NextFunction) => {
  userController.signup(request, response, next)
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