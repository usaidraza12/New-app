import { DB } from "../../../lib/mongodb";
import Car from "../../module/cart/cart";




export async function POST(request) {
  try {
    await DB();
    const { product } = await request.json();
// console.log(product.name)
    // check existing item
    const findCart = await Car.findOne({ name: product.name });

    if (findCart) {
      // console.log("mil ")
      findCart.quantity += product.quantity;
      await findCart.save();
      return Response.json({ message: "Item quantity updated" }, { status: 200 });
    }

console.log(product)
    const cartItem = await Car.create({
      category: product.category,
      price: product.price,
      name: product.name,
      totalPrice: product.totalPrice,
      selectedSize: product.selectedSize,
      quantity: product.quantity,
      profileImageUrl: product.image,
      UserId:product.UserId,
    });

    return Response.json(
      {
        success: true,
        message: "Item added to cart successfully",
        item: cartItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Add to cart error:", error);
    return Response.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}
