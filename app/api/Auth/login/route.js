export const dynamic = "force-dynamic"; // optional (disable edge caching)
export const runtime = "nodejs"; // ✅ force Node.js runtime
 
import { NextResponse } from "next/server";
import { DB } from "../../../lib/mongodb";
import Login from "../../module/mymo/login";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey"; // 🔑 secret env me rakhna

export async function POST(req) {
  try {
    await DB();

    const { email, password } = await req.json();
// console.log(email,password)
    // User check
    const user = await Login.findOne({ email });
    // console.log(user)
    if (!user) {
      // console.log("no")
      return NextResponse.json({ message: "Invalid email" }, { status: 401 });
    }
      // console.log("yes")

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // console.log("password notmatch")
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
      // console.log("match")

    // ✅ JWT token generate
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Cookie me token set karo
    const response = NextResponse.json({
      message: "Login successful",
      role: user.role,
    });

    response.cookies.set("token", token, {
      httpOnly:false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    response.cookies.set("id", user._id, {
       httpOnly: false,   // ✅ ab JS me get kar sakte ho
  secure: false,
  sameSite: "lax",
     });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
// import { NextResponse } from "next/server";
// import { DB } from "../../../lib/mongodb";
// import Login from "../../module/user/login";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     await DB();

//     const { email, password } = await req.json();

//     // Check user
//     const user = await Login.findOne({ email });
//     if (!user) {

//       return NextResponse.json({ message: "not valid" }, { status: 401 });


//       // return NextResponse.redirect(new URL("/register", req.url));
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {

//       return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

//     }

//     // Set cookies (token + role)

//     const response = NextResponse.json({ message: "Login successful", role: user.role });
//     response.cookies.set("token", "abc123xyz", {
//       httpOnly: true,
//       secure: true,
//       path: "/",
//       maxAge: 60 * 60,
//     });
//     response.cookies.set("role", user.role, {
//       httpOnly: true,
//       secure: true,
//       path: "/",
//       maxAge: 60 * 60,
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json({ message: "Error", error }, { status: 500 });
//   }
// }


