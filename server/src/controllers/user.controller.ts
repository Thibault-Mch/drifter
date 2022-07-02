
import userMongooseSchema from "../schemas/user.mongoose";
import { v4 as uuidv4 } from 'uuid';

interface User {
  name: string;
  age?: number;
  _id?: string;
  creationDate?: string;
  modificationDate?: string;
}
class UserController {
  createUser(userData: User) {
    const user: User = userData
    user._id = uuidv4()
    user.creationDate = new Date().toISOString();
    user.modificationDate = new Date().toISOString();
    // add here the jwt auth
    return new userMongooseSchema(userData);
  }
}

export default new UserController()
