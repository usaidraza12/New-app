import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, default: 1 },
})
const Item= mongoose.model("ItemCart", cartSchema);
export default Item
