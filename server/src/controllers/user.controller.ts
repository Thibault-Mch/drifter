
import userMongooseSchema from "../schemas/user.mongoose";
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../interfaces/user.interface'
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Password } from "../middleware/auth.middleware"
import * as fs from 'fs';
import * as path from 'path';

const privateKey = fs.readFileSync(path.join(__dirname, '../../../private.key'));
const tokenExpirationInSeconds = 36000

class UserController {
  async signup(request: Request, res: Response, next: NextFunction) {
    try {
      const username: string = request.body.username
      const email: string = request.body.email
      const password: string = request.body.password
      const _id: string = uuidv4()
      const creationDate: string = new Date().toISOString();
      const modificationDate: string = new Date().toISOString();
      const user = await this.findUserByEmail(email)
      if (user) {
        throw new Error("User Already Exists")
      } else {
        try {
          const newUser = await this.createUser({
            username,
            email,
            password,
            _id,
            creationDate,
            modificationDate
          })
          // don't send real password in token
          const hashedPassword = newUser?.password
          const token = jwt.sign({ username, hashedPassword }, privateKey, {
            expiresIn: tokenExpirationInSeconds,
          })
          return res.status(200).json({
            success: true,
            data: newUser,
            token,
          })
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          } else {
            console.log('Unexpected error with signup', error);
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email
      const password = req.body.password
      const user = await this.findUserByEmail(email)
      console.log("user", user)
      if (user && user.password) {
        const isPasswordMatch = await Password.compare(user.password, password)
        if (!isPasswordMatch) {
          throw new Error("Invalid Password")
        } else {
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
        console.log("User Not Found")
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
      return user
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        console.log('Unexpected error with signup', error);
      }
    }
  }

  async findUserByEmail(email: string) {
    return userMongooseSchema.findOne({
      email: email,
    }).exec()
  }
}
export default new UserController()


