import { NextResponse } from "next/server";
import { DB } from "../../../lib/mongodb";
import Car from "../../module/cart/cart";

export async function POST(req) {
  try {
    await DB();
    const { userId, productId } = await req.json();

    const cartItem = await Car.findOne({_id: productId });

    if (!cartItem) {
      return NextResponse.json({ message: "Item not found in cart" }, { status: 404 });
    }

    cartItem.quantity += 1;
    await cartItem.save();

    return NextResponse.json({ message: "Quantity increased", cartItem });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
