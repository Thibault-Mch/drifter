import express from "express";
import userSchema from "../schemas/user.mongoose";
const app = express();

app.post("/add-user", async (request, response) => {

  const user = new userSchema(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).send(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
});

app.get("/users", async (request, response) => {
  const users = await userSchema.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default app