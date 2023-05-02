import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  department: String,
});

const userModel = mongoose.model("user", userSchema);

export { userModel };
