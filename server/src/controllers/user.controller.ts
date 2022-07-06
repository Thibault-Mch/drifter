
import userMongooseSchema from "../schemas/user.mongoose";
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../interfaces/user.interface'
import { NextFunction, Request, Response } from "express"
import debug, { IDebugger } from "debug"
import jwt from "jsonwebtoken"
import { Password } from "../middleware/auth.middleware"
import * as fs from 'fs';
import * as path from 'path';

const privateKey = fs.readFileSync(path.join(__dirname, '../../../private.key'));
const tokenExpirationInSeconds = 36000
const log: IDebugger = debug("user:controller")
class UserController {
  async signup(request: Request, res: Response, next: NextFunction) {
    try {
      const username = request.body.username
      const email = request.body.email
      const password = request.body.password
      const _id = uuidv4()
      const creationDate = new Date().toISOString();
      const modificationDate = new Date().toISOString();
      const user = await this.findUserByEmail(email)
      log("user", user)
      if (user) {
        throw new Error("User Already Exists")
      } else {
        try {
          const newUser: IUser = await this.createUser({
            username,
            email,
            password,
            _id,
            creationDate,
            modificationDate
          })
          const token = jwt.sign({ username, password }, privateKey, {
            expiresIn: tokenExpirationInSeconds,
          })
          delete newUser.password
          return res.status(200).json({
            success: true,
            data: newUser,
            token,
          })
        } catch (e) {
          log("Controller capturing error", e)
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
      const user = await this.findUserByEmail(email)
      log("user", user)
      if (user) {
        const isPasswordMatch = await Password.compare(user.password, password)
        if (!isPasswordMatch) {
          throw new Error("Invalid Password")
        } else {
          console.log("jwt Secret", privateKey)
          const token = jwt.sign(req.body, privateKey, {
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

  async createUser(data: IUser) {
    try {
      const user = userMongooseSchema.build(data)
      await user.save()
    } catch (e) {
      throw new Error(e)
    }
  }

  async findUserByEmail(email: string) {
    return userMongooseSchema.findOne({
      email: email,
    }).exec()
  }
}
export default new UserController()


