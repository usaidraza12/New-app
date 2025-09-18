import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    category: { type: String },
    price: {type:Number, required:true },
    name: { type: String, required: true },
    totalPrice: { type: Number ,require:true},
    selectedSize: { type: String, required: true },
    quantity: { type: Number, required: true },
    profileImageUrl: { type: String, required: true },
    UserId: { type: String, required: true }
  },
  { timestamps: true }
);

// ✅ Agar model pehle se bana hai to usi ko use karo, warna naya banao
const Car = mongoose.models.MyCart || mongoose.model("MyCart", CartSchema);

export default Car;
