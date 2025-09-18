import Link from "next/link"
import { setData } from "../context/counterSlice"
import { useDispatch} from "react-redux"
import { useSelector } from "react-redux"
import axios from "axios"
import { useState ,useEffect} from "react"
export default function ProductCard({ product }) {
  const cart= product
  const dispatch= useDispatch()

  const info = useSelector((state)=>(state.counter.data))
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300" onClick={()=>{
      
                  dispatch(setData(product))
                   localStorage.setItem("cartpro", JSON.stringify(product));
                  // console.log(info)
              
                
    }}>
      <Link href={`/Products`} className="block">

        {" "}
        {/* Link updated */}
        <img
          src={cart.image || "/placeholder.svg"}
          alt={cart.name}
          className="w-full h-64 object-cover object-center"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{cart.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{cart.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">Rs. {cart.price}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm">
            Cart Mein Dalen
          </button>
        </div>
      </div>
    </div>
  )
}
