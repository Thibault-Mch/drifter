import mongoose from "mongoose";
interface userSchema {
  name: string;
  age?: number;
  _id: string;
  creationDate: string;
  modificationDate: string;
}

const userSchema = new mongoose.Schema({
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

const User = mongoose.model("User", userSchema);

export default User
