import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sizes: [String],
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ OverwriteModelError se bachne ka tariqa
const AddCart =  mongoose.models.AdminCart || mongoose.model("AdminCart", CartSchema);

export default AddCart;
