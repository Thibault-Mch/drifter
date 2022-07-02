
import userMongooseSchema from "../schemas/user.mongoose";
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../interfaces/user.interface'

class UserController {
  createUser(userData: IUser) {
    const user: IUser = userData
    user._id = uuidv4()
    user.creationDate = new Date().toISOString();
    user.modificationDate = new Date().toISOString();
    // add here the jwt auth
    return new userMongooseSchema(userData);
  }
}

export default new UserController()
