import { DB } from "../../../lib/mongodb"
// import { DB } from "@/app/lib/mongodb"
// import {Add} from "../../module/cart/cart"
import AddCart from "../../module/cart/addcart"
export async function DELETE(request) {
    await DB()
  try {
    const body = await request.json()
    const { name} = body
    // console.log(name)

    const find= await AddCart.findOneAndDelete({name:name})
    // Validate required fields
    if (!find) {
      return Response.json({ error: "Product name is required" }, { status: 400 })
    }

    // Here you can add database logic if needed
    // For now, just returning success response
    return Response.json(
      {
        success: true,
        message: "Item removed from cart successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Remove from cart error:", error)
    return Response.json({ error: "Failed to remove item from cart" }, { status: 500 })
  }
}
export async function GET(request) {
  await DB()
  const data = await AddCart.find();
 
  if (data.length === 0) {  // 🔹 Agar koi record nahi mila
    return Response.json(
      { message: "keep shopping" },
      { status: 201 }
    );
  }

  return Response.json(
    { data:data },
    { status: 200 }
  )

}