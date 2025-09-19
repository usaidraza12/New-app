import { NextResponse } from "next/server";
import { DB } from "../../../lib/mongodb";
import Car from "../../module/cart/cart";

export async function POST(req) {
  try {
    await DB();
    const { productId } = await req.json();

    const cartItem = await Car.findOne({_id:productId});
    //  console.log("mycart",cartItem)
    if (!cartItem) {
      return NextResponse.json({ message: "Item not found in cart" }, { status: 404 });
    }
    else if(cartItem.quantity < 2){
     await Car.findByIdAndDelete({_id:cartItem._id})
      return NextResponse.json({ message: "Item not found in cart" }, { status: 200 });

    }

    if (cartItem) {
      cartItem.quantity -= 1;
      // console.log(cartItem)
      await cartItem.save();
      return NextResponse.json({ message: "Quantity decreased", cartItem });
    } else {
      await Car.deleteOne({ userId, productId });
      return NextResponse.json({ message: "Item removed from cart" });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
