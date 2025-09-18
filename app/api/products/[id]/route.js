import { DB } from "../../../lib/mongodb";
import AddCart from "../../module/cart/addcart";

// GET single product by ID
export async function GET(req, { params }) {
  try {
    await DB();
    const product = await AddCart.findById(params.id);

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json(product, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT update product by ID
export async function PUT(req, { params }) {
  try {
    await DB();

    const contentType = req.headers.get("content-type") || "";

    let updatedProduct;

    // 🔹 Agar FormData bheja hai (image ke sath)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("image"); // 👈 file aayegi yahan

      const myData = JSON.parse(formData.get("myData")); // 👈 product ka object aayega

      updatedProduct = await AddCart.findByIdAndUpdate(params.id, myData, {
        new: true,
      });

      // TODO: yahan tum apna image upload logic lagao (Cloudinary, local storage, etc.)
      console.log("Image file:", file?.name);
    } else {
      // 🔹 Agar sirf JSON bheja hai
      const body = await req.json();

      updatedProduct = await AddCart.findByIdAndUpdate(params.id, body, {
        new: true,
      });
    }

    if (!updatedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
