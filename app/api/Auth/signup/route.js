import { NextResponse } from "next/server";
import { DB } from "../../../lib/mongodb";
import Signup from "../../module/mymo/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await DB();

    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await Signup.findOne({ email });

    
    if (existingUser) {
      
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role = user
    let role = "user";

    // Agar email = usaidmalik455@gmail.com → role = admin
    if (email === "usaidmalik455@gmail.com") {
      role = "admin";
    }

    const newUser = new Signup({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return NextResponse.json({ message: "Signup successful", role }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
