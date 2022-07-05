
import userMongooseSchema from "../schemas/user.mongoose";
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../interfaces/user.interface'
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Password } from "../middleware/auth.middleware"
const tokenExpirationInSeconds = 36000
class UserController {
  createUser(userData: IUser) {
    const user: IUser = userData
    user._id = uuidv4()
    user.creationDate = new Date().toISOString();
    user.modificationDate = new Date().toISOString();
    // add here the jwt auth
    return new userMongooseSchema(userData);
  }

  async signup(request: Request, res: Response, next: NextFunction) {
    try {
      const username = request.body.username
      const email = request.body.email
      const password = request.body.password
      const user = await AuthService.findUserByEmail(email)
      console.log("user", user)
      if (user) {
        throw new Error("User Already Exists")
      } else {
        try {
          const newUser = await AuthService.createUser({
            username,
            email,
            password,
          })
          const token = jwt.sign({ username, password }, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
          })
          return res.status(200).json({
            success: true,
            data: newUser,
            token,
          })
        } catch (e) {
          console.log("Controller capturing error", e)
          throw new Error("Error while register")
        }
      }
    } catch (e) {
      next(e)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email
      const password = req.body.password
      const user = await AuthService.findUserByEmail(email)
      console.log("user", user)
      if (user) {
        const isPasswordMatch = await Password.compare(user.password, password)
        if (!isPasswordMatch) {
          throw new Error("Invalid Password")
        } else {
          console.log("jwt Secret", jwtSecret)
          const token = jwt.sign(req.body, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
          })
          return res.status(200).json({
            success: true,
            data: user,
            token,
          })
        }
      } else {
        log("User Not Found")
        throw new Error("User Not Found")
      }
    } catch (e) {
      next(e)
    }
  }
}
export default new UserController()


