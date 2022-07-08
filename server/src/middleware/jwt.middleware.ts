import { NextFunction, Request, Response } from "express"
import debug, { IDebugger } from "debug"
import jwt from "jsonwebtoken"
import * as fs from 'fs';
import * as path from 'path';

const privateKey = fs.readFileSync(path.join(__dirname, '../../../private.key'));
const log: IDebugger = debug("middleware:JWT")

class JWT {
  authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader !== "null") {
      // const token = authHeader.split(" ")[1]; this if different tokens
      log("auth Header", privateKey)
      jwt.verify(authHeader, privateKey, (err: any, user: any) => {
        if (err) {
          log("Error", err)
          return res
            .status(403)
            .send({ success: false, message: "Token Expired" })
        }
        console.log("you are logged in")
        next()
      })
    } else {
      res.status(403).json({ success: false, message: "You are not logged in" })
    }
  }
}

export default new JWT()