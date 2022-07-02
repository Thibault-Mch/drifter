import mongoose, { Schema, Model, Document } from "mongoose";
import { IUser } from '../interfaces/user.interface'
import { Password } from '../middleware/auth.middleware'

// export interface UserDocument extends Document {
//   _id: string;
//   name: string;
//   age?: number;
//   creationDate: string;
//   modificationDate: string;
// }
// interface UserModel extends Model<UserDocument> {
//   build(attrs: IUser): UserDocument
// }

const userSchema: Schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  age: {
    type: Number,
    default: 0,
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
});

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

const User = mongoose.model<IUser>(
  "User",
  userSchema
)

export default User
