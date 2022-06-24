import mongoose from "mongoose";
interface userSchema {
  name: string;
  age?: number;
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  age: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

export default User
