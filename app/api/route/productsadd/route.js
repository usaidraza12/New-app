import { writeFile } from "fs";
import { NextResponse } from "next/server";
import { DB } from "../../../lib/mongodb";
import AddCart from "../../module/cart/addcart";
export async function GET(request) {
 try {
  await DB()
  const datafind =await AddCart.find()
  if(datafind){
    return NextResponse.json({data:datafind})
    
  }
  return NextResponse.json({message:"coming soon"})
 } catch (error) {
  return NextResponse.json({"err":error})
 }
  
}
