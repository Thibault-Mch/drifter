import { NextFunction, Request, Response, Router } from "express";
import userController from "../controllers/user.controller";
import { jwt } from "../middleware/index.middleware"

export const userRoutes = Router();

userRoutes.post("/signup", (request: Request, response: Response, next: NextFunction) => {
  userController.signup(request, response, next)
});

userRoutes.post("/login", (request: Request, response: Response, next: NextFunction) => {
  userController.login(request, response, next)
})

userRoutes.get("/is-logged", (request: Request, response: Response, next: NextFunction) => {
  jwt.authenticateJWT(request, response, next)
})

// app.get("/users", async (request: Request, response: Response) => {
//   const users = await userMongooseSchema.find({});
//   try {
//     response.send(users);
//   } catch (error) {
//     if (error instanceof Error) {
//       response.status(500).send(error.message);
//     } else {
//       console.log('Unexpected error', error);
//     }
//   }
// });


