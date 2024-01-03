import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    required: [true, "please provide a username"],
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmins: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// in case of nextjs, check whether model is already created or not..
// if model already exists then use it otherwise create it.
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
