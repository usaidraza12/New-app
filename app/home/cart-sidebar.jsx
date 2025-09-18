"use client"

import { useCart } from "../cart/page"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import { useSelector } from "react-redux"

export default function CartSidebar() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice, isCartOpen, closeCart } = useCart()
const Data=useSelector((state)=>state.counter.info)

  

  if (!isCartOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeCart}></div>

      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Shopping Cart</h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Aapka cart khali hai</p>
              <button
                onClick={closeCart}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Shopping Continue Karein
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                    <p className="text-gray-600 text-xs">{item.category}</p>
                    <p className="text-blue-600 font-semibold">Rs. {item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded-md hover:bg-red-100 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 ml-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Cart Footer */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>Rs. {getTotalPrice()}</span>
                </div>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium">
                    Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cart Clear Karein
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
