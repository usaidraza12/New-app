// "use client"

// import Link from "next/link"
// import { useCart } from "../contexts/cart-context"
// import { useEffect } from "react"

// export default function ProductCard({ product }) {

//     useEffect(()=>{
//         const product
//     })
//   const { addToCart } = useCart()

//   const handleAddToCart = (e) => {
//     e.preventDefault() // Prevent navigation when clicking the button
//     addToCart(product)
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
//       <Link href={`/products/${product.id}`} className="block">
//         <img
//           src={product.image || "/placeholder.svg"}
//           alt={product.name}
//           className="w-full h-64 object-cover object-center"
//         />
//       </Link>
//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
//         <p className="text-gray-600 text-sm mb-2">{product.category}</p>
//         <div className="flex items-center justify-between">
//           <span className="text-xl font-bold text-blue-600">Rs. {product.price}</span>
//           <button
//             onClick={handleAddToCart}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm"
//           >
//             Cart Mein Dalen
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
