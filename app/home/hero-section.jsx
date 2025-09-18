"use client" // Client component banaya gaya hai

import { useState, useEffect } from "react"
import Link from "next/link"

// Aapki di hui 4 T-shirt images
const tShirtImages = [
  "/images/tshirt-pagani-huayra-new.png",
  "/images/tshirt-predict-future-new.png",
  "/images/tshirt-universe-deepspac-new.png",
  "/images/tshirt-not-okay-new.png",
]

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tShirtImages.length)
    }, 2000) // Har 2 second mein image change hogi

    return () => clearInterval(interval) // Component unmount hone par interval clear karein
  }, []) // Empty dependency array means this effect runs once on mount

  return (
    <section className="relative bg-black  text-white py-20 md:py-32 overflow-hidden ">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {" "}
        {/* overflow-hidden added here */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }} // Images ko slide karne ke liye
        >
          {tShirtImages.map((imageSrc, index) => (
            <img
              key={index}
              src={imageSrc || "/placeholder.svg"}
              alt={`Stylish T-shirt ${index + 1}`}
              className="w-full h-full object-cover opacity-50 flex-shrink-0" // flex-shrink-0 zaroori hai taake images shrink na hon
            />
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          Apni Style Discover Karein: Trendy T-Shirts
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
          Down Shoulder se lekar Classic Fits tak, har mauqe ke liye behtareen T-shirts ka collection.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-white text-black hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg transform hover:scale-105"
        >
          Abhi Shop Karein
        </Link>
      </div>
    </section>
  )
}
