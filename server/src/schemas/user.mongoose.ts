import mongoose, { Schema, Model, Document } from "mongoose";
import { IUser } from '../interfaces/user.interface'
import { Password } from '../middleware/auth.middleware'

export interface UserDocument extends Document {
  _id: string;
  username: string;
  email: string;
  creationDate: string;
  modificationDate: string;
  password?: string;
}
interface UserModel extends Model<UserDocument> {
  build(attrs: IUser): UserDocument
}

const userSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: 0,
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: [true, 'username taken']
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    creationDate: {
      type: String,
      required: true,
      default: new Date().toISOString(),
    },
    modificationDate: {
      type: String,
      required: true,
      default: new Date().toISOString(),
    },
  },
  {
    // user password is deleted when returning to FE
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"))
    this.set("password", hashed)
  }
  done()
})

userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs)
}


const User = mongoose.model<UserDocument, UserModel>(
  "User",
  userSchema
)

export default User
