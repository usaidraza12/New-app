import { DB } from "../../../lib/mongodb"
import Car from "../../module/cart/cart"
export async function DELETE(request) {
    await DB()
  try {
    const body = await request.json()
    // console.log(body)
    const { name} = body
    // console.log(name)

    const find= await Car.findOneAndDelete({name:name})
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
