import Car from "../module/cart/cart";
import { DB } from "../../lib/mongodb";
import multer from "multer";
import { writeFile } from "fs/promises"; // async fs module
import { NextResponse } from "next/server";
import AddCart from "../module/cart/addcart";


export async function POST(request) {
  try {
    await DB();
    const formData = await request.formData();
    const date = Date.now();

    // file
    const image = formData.get("image");
    // string to object
    const Data = JSON.parse(formData.get("myData"));

    if (!image && !Data) {
      return NextResponse.json(
        { error: "No file or data provided" },
        { status: 400 }
      );
    }

    // convert file -> buffer
    const imageBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // save to public folder
    const path = `./public/${date}_${image.name}`;
    await writeFile(path, buffer);

    const imageUrl = `${date}_${image.name}`;

    // check if product with same name exists
    let create = await AddCart.findOne({ name: Data.name });

    // if (create) {
    //   // agar product already hai to sizes merge karo
    //   create.sizes = [...new Set([...create.sizes, ...Data.sizes])];
    //   await create.save();
    // } else {
    //   // naya product banao
    //   create = await AddCart.create({
    //     category: Data.category,
    //     description: Data.description,
    //     price: Data.price,
    //     name: Data.name,
    //     sizes: Data.sizes,
    //     stock: Data.stock,
    //     image: imageUrl,
    //   });
    // }

    if (create) {
  // purani sizes agar array hai to use karo warna empty array
  const oldSizes = Array.isArray(create.sizes) ? create.sizes : [];
  const newSizes = Array.isArray(Data.sizes) ? Data.sizes : [];

  create.sizes = [...new Set([...oldSizes, ...newSizes])];
  await create.save();
} else {
  // naya product banao
  create = await AddCart.create({
    category: Data.category,
    description: Data.description,
    price: Data.price,
    name: Data.name,
    sizes: Array.isArray(Data.sizes) ? Data.sizes : [],
    stock: Data.stock,
    image: imageUrl,
  });
}


    return NextResponse.json({ success: true, imageUrl, create });
  } catch (error) {
    // console.error("Upload error:", error);
    return NextResponse.json(
      { error: "File upload failed", details: error.message },
      { status: 500 }
    );
  }
}
// export async function GET(request) {

//   try {
//     await DB()

//   const data = await Car.find();
 
//   if (data.length === 0) {  // 🔹 Agar koi record nahi mila
//     return NextResponse.json(
//       { message: "keep shopping" },
//       { status: 201 }
//     );
//   }

//   return NextResponse.json(
//     { data:data },
//     { status: 200 }
//   )
//   } catch (error) {
//     return  NextResponse(error)
//   }
  

// }