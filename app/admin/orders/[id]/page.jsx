"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Package, User, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock order data - in real app, fetch based on params.id
const mockOrder = {
  id: 1001,
  customerName: "Ahmad Ali",
  customerEmail: "ahmad@example.com",
  customerPhone: "+92 300 1234567",
  orderDate: "2024-01-15",
  status: "delivered",
  total: 89.97,
  subtotal: 84.97,
  shipping: 5.0,
  tax: 0.0,
  items: [
    {
      id: 1,
      productName: "Pagani Huayra T-Shirt",
      quantity: 2,
      price: 29.99,
      size: "L",
      image: "/images/tshirt-pagani-huayra-new.png",
    },
    {
      id: 2,
      productName: "Predict Future T-Shirt",
      quantity: 1,
      price: 24.99,
      size: "M",
      image: "/images/tshirt-predict-future-new.png",
    },
  ],
  shippingAddress: {
    name: "Ahmad Ali",
    street: "123 Main Street",
    city: "Karachi",
    state: "Sindh",
    zipCode: "75500",
    country: "Pakistan",
  },
  billingAddress: {
    name: "Ahmad Ali",
    street: "123 Main Street",
    city: "Karachi",
    state: "Sindh",
    zipCode: "75500",
    country: "Pakistan",
  },
  paymentMethod: "Credit Card",
  trackingNumber: "TRK123456789",
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function OrderDetailPage({ params }) {
  const [order, setOrder] = useState(mockOrder)

  const updateOrderStatus = (newStatus) => {
    setOrder((prev) => ({ ...prev, status: newStatus }))
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-gray-600 mt-2">Order placed on {new Date(order.orderDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items ({order.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.productName}</h3>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">${item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Contact Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <strong>Name:</strong> {order.customerName}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.customerEmail}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.customerPhone}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <strong>Total Items:</strong> {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                    <p>
                      <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Payment:</strong> {order.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Current Status</label>
                <Select value={order.status} onValueChange={updateOrderStatus}>
                  <SelectTrigger className="mt-1">
                    <SelectValue>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {order.trackingNumber && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Tracking Number</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono">{order.trackingNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Send Email Update</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Print Invoice
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Refund Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
