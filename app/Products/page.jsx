"use client"

import Link from "next/link"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"
import FeaturedProducts from "../home/featured-products"
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

export default function ProductDetailPage() {
  const router = useRouter();
   const UserId = Cookies.get("id");  
  // console.log(UserId);
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState("")
  const [product, setProduct] = useState(null)
  const handleAdd = () => {
    // Yahan apna cart add logic likho
    toast.success("🛒 Product added to cart!");
  };

   const handleC = () => {
    // Yahan apna cart add logic likho
    toast.success("🛒 Product added nh howa");
  };
  // ✅ Client pe localStorage access karo
  useEffect(() => {
    const saved = localStorage.getItem("cartpro")
    if (saved) {
      setProduct(JSON.parse(saved)) // string ko object banado
    }
  }, [])

  const sizes = ["S", "M", "L", "XL", "XXL"]

  const sendDataToBackend = async () => {
    if (!selectedSize) {
      setError("Pehle size select karein!")
      return
    }

    setError("")

    try {
      const res = await axios.post("/api/cart/add", {
        product: {
          ...product,
          selectedSize,
          quantity,
          totalPrice: product.price * quantity,
          UserId:UserId
        },
      })

      handleAdd()
      router.replace("/")
    } catch (error) {
      console.error("Error sending data:", error)
      handleC()
    }
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Nahi Mila</h1>
        <p className="text-gray-600 mb-6">Aap jis product ko dhoondh rahe hain woh maujood nahi hai.</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Shop Par Wapas Jayen
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-4 flex items-center justify-center bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full h-auto object-contain rounded-lg"
                style={{ maxHeight: "500px" }}
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-blue-600 text-lg font-semibold mb-4">{product.category}</p>
              <p className="text-gray-800 text-4xl font-extrabold mb-6">Rs. {product.price}</p>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Tafseelat</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Size Select Karein</h3>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md font-medium transition-colors duration-200 ${
                        selectedSize === size
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {selectedSize && <p className="text-sm text-green-600 mt-2">Selected Size: {selectedSize}</p>}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-xl font-semibold text-gray-800 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">Total: Rs. {(product.price * quantity).toLocaleString()}</p>
              </div>

              {error && <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">{error}</div>}

              {/* Add to Cart Button */}
              <button
                className="w-full bg-blue-600 text-white text-lg cursor-pointer font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
                onClick={sendDataToBackend}
              >
                <ShoppingCart className="h-5 w-5" />
                Cart Mein Dalen
              </button>
              <Toaster position="top-right" />

              {/* Back to Shop Link */}
              <div className="mt-6 text-center">
                <Link href="/" className="text-blue-600 hover:underline text-sm">
                  Shop Par Wapas Jayen
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <FeaturedProducts/>
    </>
  )
}
 
// import Link from "next/link"
// import { ShoppingCart, Plus, Minus } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useSelector } from "react-redux"
// import { useState, useEffect } from "react"
// import axios from "axios"
// import FeaturedProducts from "../home/featured-products"

// export default function ProductDetailPage() {
//   const router = useRouter();
//   const [selectedSize, setSelectedSize] = useState("")
//   const [quantity, setQuantity] = useState(1)
//   const [error, setError] = useState("")
//   const [product, setProduct] = useState(null)
//   const [isClient, setIsClient] = useState(false)
//   const prodo = localStorage.getItem("cartpro");

//   useEffect(()=>{
// if(prodo){
//   setProduct(prodo)
// }else{
//   null;
// }
//   },[prodo])
//   // useEffect(() => {

//   //   setIsClient(true)
    
//   //   // Check if we have product data from Redux first
//   //   if (prod) {
//   //     setProduct(prod)
//   //     // Also save to localStorage for persistence
//   //   } else {
//   //     // If not in Redux, try to get from localStorage
//   //     return null
//   //   }
//   // }, [prod])

//   // Save to localStorage whenever product changes
//   // useEffect(() => {
//   //   if (product && typeof window !== 'undefined') {
//   //     localStorage.setItem("product", JSON.stringify(product))
//   //   }
//   // }, [product])

//   const sizes = ["S", "M", "L", "XL", "XXL"]

//   const sendDataToBackend = async () => {
//     if (!selectedSize) {
//       setError("Pehle size select karein!")
//       return
//     }

//     setError("")

//     try {
//       const res = await axios.post("http://localhost:3000/api/cart/add", {
//         product: {
//           ...product,
//           selectedSize,
//           quantity,
//           totalPrice: product.price * quantity,
//         },
//       })

//       alert("Product cart mein add ho gaya!")
//       router.replace("/")
//     } catch (error) {
//       console.error("Error sending data:", error)
//       alert("Kuch galat ho gaya, dobara try karein!")
//     }
//   }

//   const increaseQuantity = () => {
//     setQuantity((prev) => prev + 1)
//   }

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity((prev) => prev - 1)
//     }
//   }
  

//   if (!product) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Nahi Mila</h1>
//         <p className="text-gray-600 mb-6">Aap jis product ko dhoondh rahe hain woh maujood nahi hai.</p>
//         <Link
//           href="/"
//           className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
//         >
//           Shop Par Wapas Jayen
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gray-100">
//         <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
//             {/* Product Image */}
//             <div className="md:w-1/2 p-4 flex items-center justify-center bg-gray-50">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="max-w-full h-auto object-contain rounded-lg"
//                 style={{ maxHeight: "500px" }}
//               />
//             </div>

//             {/* Product Details */}
//             <div className="md:w-1/2 p-6 md:p-8">
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
//               <p className="text-blue-600 text-lg font-semibold mb-4">{product.category}</p>
//               <p className="text-gray-800 text-4xl font-extrabold mb-6">Rs. {product.price}</p>

//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-3">Tafseelat</h2>
//                 <p className="text-gray-700 leading-relaxed">{product.description}</p>
//               </div>

//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Size Select Karein</h3>
//                 <div className="flex gap-2 flex-wrap">
//                   {sizes.map((size) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`px-4 py-2 border rounded-md font-medium transition-colors duration-200 ${
//                         selectedSize === size
//                           ? "bg-blue-600 text-white border-blue-600"
//                           : "bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//                 {selectedSize && <p className="text-sm text-green-600 mt-2">Selected Size: {selectedSize}</p>}
//               </div>

//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h3>
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={decreaseQuantity}
//                     disabled={quantity <= 1}
//                     className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </button>
//                   <span className="text-xl font-semibold text-gray-800 min-w-[3rem] text-center">{quantity}</span>
//                   <button
//                     onClick={increaseQuantity}
//                     className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </button>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-2">Total: Rs. {(product.price * quantity).toLocaleString()}</p>
//               </div>

//               {error && <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">{error}</div>}

//               {/* Add to Cart Button */}
//               <button
//                 className="w-full bg-blue-600 text-white text-lg cursor-pointer font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
//                 onClick={sendDataToBackend}
//               >
//                 <ShoppingCart className="h-5 w-5" />
//                 Cart Mein Dalen
//               </button>

//               {/* Back to Shop Link */}
//               <div className="mt-6 text-center">
//                 <Link href="/" className="text-blue-600 hover:underline text-sm">
//                   Shop Par Wapas Jayen
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//       <FeaturedProducts/>
//     </>
//   )
// } 