import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;
//   const role = req.cookies.get("role")?.value;
//   const path = req.nextUrl.pathname;
// console.log("token",token,"role",role,"path",path)
//   // 🔹 Step 1: Authentication check (token required)
//   if (!token && !role) {
//     // Agar token hi nahi hai → login page pe bhejo
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // 🔹 Step 2: Authorization check
//   if (path.startsWith("/admin")) {
//     // sirf admin ko allow karo
//     if (role !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url)); // user ko block
//     }
//   }

//   // Normal user routes (dashboard, shop, cart, etc.)
//   if (path.startsWith("/category") || path.startsWith("/cart") || path.startsWith("/shop")) {
//     // yahan dono roles ja sakte hain (admin + user)
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }
// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;
//   console.log(token)

//   if (!token) {
//     // Token hi nahi → login page pe bhej do
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     // JWT decode karo
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Role check karo
//     if (req.nextUrl.pathname.startsWith("/admin")) {
//       if (decoded.role !== "admin") {
//         return NextResponse.redirect(new URL("/shop", req.url));
//       }
//     }

//     if (req.nextUrl.pathname.startsWith("/admin")) {
//       if (decoded.role !== "user") {
//         return NextResponse.redirect(new URL("/not-authorized", req.url));
//       }
//     }

//     return NextResponse.next();
//   } catch (err) {
//     console.error("Invalid token", err);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET); // same secret jo token banate waqt use kiya

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;  
  const path = req.nextUrl.pathname;
  const id = req.cookies.get("id")?.value;

  if (!token  && !id) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
 

  try {
    // verify token
    const { payload } = await jwtVerify(token, SECRET);

    // role check
    if (path.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
     else if (
      path.startsWith("/cart") ||
      path.startsWith("/category")
    ) {
      // Yaha role ki zarurat nahi hai, token valid hai to allow karo
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT Error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = {
  matcher: [
    "/category/:path*",
    "/cart/:path*",
    "/Products/:path*",
    "/shop/:path*",
    "/admin/:path*", // protect admin routes
  ],
};
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "mySecretKey";

// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;
//   const path = req.nextUrl.pathname;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     // JWT verify
//     const decoded = jwt.verify(token, SECRET);

//     // Admin routes
//     if (path.startsWith("/admin") && decoded.role !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     // Normal routes → user + admin dono
//     return NextResponse.next();
//   } catch (err) {
//     console.error("JWT Error:", err.message);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: [
//     "/category/:path*",
//     "/cart/:path*",
//     "/shop/:path*",
//     "/admin/:path*",
//   ],
// };
