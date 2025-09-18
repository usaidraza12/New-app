import { NextResponse } from "next/server";
import { DB } from "../../../lib/mongodb";
import Car from "../../module/cart/cart";
// export async function GET(req, { params }) {
//   const { id } = params;
//   return NextResponse.json({ message: `You sent id: ${id}` });
// }
 // import { DB } from "@/app/lib/mongodb";
// import Car from "../../module/cart/cart";
// import { NextResponse } from "next/server";
export async function GET(request,{params}) {

  try {
    await DB()
const {id} = await params;
// console.log(id)
  const data = await Car.find({UserId:id});


  // console.log(data)
 
  if (data.length === 0) {  // 🔹 Agar koi record nahi mila
    return NextResponse.json(
      { message: "keep shopping" },
      { status: 201 }
    );
  }
  return NextResponse.json(
    { data:data },
    { status: 200 }
  )
  } catch (error) {
   return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
  

}
// import { DB } from "../../lib/mongodb";
// import Car from "../module/cart/cart";
// import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   try {
//     await DB();

//     const { id } = params; // 👈 userId
//     console.log("User ID:", id);

//     // sirf usi user ka cart nikalna
//     const data = await Car.find({ userId: id });

//     if (!data || data.length == 0) {
//       return NextResponse.json(
//         { message: "keep shopping" },
//         { status: 201 }
//       );
//     }

//     return NextResponse.json(
//       { data },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Cart fetch error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch cart" },
//       { status: 500 }
//     );
//   }
// }
