import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  }
});

const Login= mongoose.models.User || mongoose.model("User", UserSchema);
export default Login

