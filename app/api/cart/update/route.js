import AddCart from "../../module/cart/addcart";
import { DB } from "@/app/lib/mongodb";
export async function PUT(req, { params }) {
  try {
    await DB();
    const { id } = params;
    const body = await req.json();

    const updatedProduct = await AddCart.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}   