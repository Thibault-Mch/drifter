import express from "express";
import userSchema from "../schemas/user.mongoose";
const app = express();

app.post("/add_user", async (request, response) => {

  const user = new userSchema(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
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