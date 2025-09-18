"use client"
import Link from "next/link"
import ProductCard from "./product-card"
import Image from "next/image"
import axios from "axios"
import { Loader } from "lucide-react"
// import Link from "next/link"
import { useState,useEffect } from "react"




export default function FeaturedProducts() {
const [pro,setPro] =useState([])
  useEffect(() => {
      const fetchProducts = async () => {
        try {
          // Replace with your actual API endpoint
          const res = await axios.get("/api/route/productsadd");
          setPro(res.data.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } 
      };
  
      fetchProducts();
    }, []);
const products =pro

  // console.log(cart)
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Hamare Top Picks: Down Shoulder aur Bohat Kuch
        </h2>
          <Link href="/shop">

        <div   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         {products?.length > 0 ? (
  products.map((product) => (
    <div
      key={product.name}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
    <Image
  src={`/${product.image}`} 
  alt={product.name}
  width={400}
  height={300}
  className="w-full h-64 object-cover"
/>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500">{product.category}</p>
        <p className="text-blue-600 font-bold">Rs {product.price}</p>
      </div>
    </div>
  ))
) : (
<div className="flex justify-center items-center py-16">
            <Loader className="h-8 w-8 animate-spin text-blue-600 mr-3" />
            <span className="text-gray-600">Loading products...</span>
          </div>
)}

        </div>
          </Link>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block bg-blue-600 text-white hover:bg-blue-700 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-md"
          >
            Tamam T-Shirts Dekhen
          </Link>
        </div>
      </div>
    </section>
  )
}
