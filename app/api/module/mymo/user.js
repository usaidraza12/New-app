import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // sirf user ya admin
      default: "user",        // default user hoga
    },
  },
  { timestamps: true }
);

const Signup= mongoose.models.User || mongoose.model("User", UserSchema);

export default Signup;