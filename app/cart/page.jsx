"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import { useDispatch } from "react-redux"
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { incrementByAmount, } from "../context/counterSlice"
import { setCart } from "../context/counterSlice"

import Cookies from "js-cookie"
export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
const dispetch = useDispatch()
const UserId =Cookies.get("id");
// console.log(UserId)
  const [loading, setLoading] = useState(true)

  // Yahan aap apna database fetch logic add kar sakte hain
  useEffect(() => {
    fetchCartItems()
  }, [])
   useEffect(() => {
    getTotal()
  }, [cartItems])


const getTotal = () => {
 
    dispetch(setCart(cartItems))
  }

  const fetchCartItems = async () => {
    try {
      // Yahan aap apni API call karenge database se data fetch karne ke liye
      const response = await fetch(`/api/myro/${UserId}`)
      const data = await response.json()
    if(data.message){
      setCartItems([ ])
    }else{
      setCartItems(data.data)
      // dispetch(incrementC(dat))
    }

      // Dummy data for now - aap isse replace kar sakte hain
      setLoading(false)
    } catch (error) {
      console.error("Error fetching cart items:", error)
      setLoading(false)
    }
  }
async function deleteCartItem(name) {
  try {
    const res = await axios.delete(`/api/cart/remove/${name}`);
    // console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    try {
      // Yahan aap database update API call karenge
      // await fetch('/api/cart/update', {
      //   method: 'PUT',
      //   body: JSON.stringify({ id, quantity: newQuantity })
      // })

      setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }
const handleIncrease = async (productId) => {
   await axios.post("/api/cart/route-i", { userId: "123", productId });
     window.location.reload(true);


};

const handleDecrease = async (productId) => {
  await axios.post('/api/cart/route-up', { userId: "123", productId });
     window.location.reload(true);

};
  const removeItem = async (name) => {
    try {
      // Yahan aap database delete API call karenge
      await fetch('/api/cart/remove', {
        method: 'DELETE',
        body: JSON.stringify({name})
      })
     window.location.reload(true);

      setCartItems((items) => items.filter((item) => item.name !== name))
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  const getTotalPrice = () => {
    return (cartItems.reduce((total, item) => total + item.price * item.quantity, 0))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cart load ho raha hai...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Shopping Continue Karein</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              Shopping Cart
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length < 1 ? (
          // Empty Cart
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Aapka Cart Khali Hai</h2>
            <p className="text-gray-600 mb-8">Kuch shopping karte hain!</p>
            <Link
              href="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Products Dekhen
            </Link>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Cart Items ({getTotalItems()} items)</h2>
                </div>

<div className="divide-y">
  {cartItems.map((item) => (
    <div key={item._id} className="p-6">
      <div className="flex items-center gap-4"> {/* items-start → items-center */}
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.profileImageUrl}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className=" flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-800 mb-1 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{item.category}</p>
          {item.size && (
            <p className="text-sm text-gray-600 mb-2">
              Size: {item.selectedsize}
            </p>
          )}
          <p className="text-lg font-semibold text-blue-600">
            Rs. {item.price}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center border rounded-lg min-w-[110px] justify-between">
            <button
              onClick={() => handleDecrease(item._id)}
              className="p-2 px-2 py-2 hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 py-2 font-medium text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleIncrease(item._id)}
              className="px-2 py-2 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.name)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="mt-4 text-right">
        <p className="text-lg font-semibold text-gray-800">
          Subtotal: Rs. {item.price * item.quantity}
        </p>
      </div>
    </div>
  ))}
</div>
               
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm sticky top-4">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({getTotalItems()})</span>
                    <span>Rs. {getTotalPrice()}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-semibold text-gray-800">
                      <span>Total</span>
                      <span>Rs. {getTotalPrice()}</span>
                    </div>
                  </div>

                  {/* <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-6">
                    Proceed to Checkout
                  </button> */}

                  <Link
                    href="/"
                    className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
