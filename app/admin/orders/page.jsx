"use client"

import { useState } from "react"
import { Button } from "../../component/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../component/ui/card"
import { Input } from "../../component/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../component/ui/select"
import { Search, Eye, Package, Truck } from "lucide-react"
import Link from "next/link"

// Mock order data - replace with real data from your database

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Dummy orders data - aap yahan apni database se data fetch kar sakte hain
  const orders = [
    {
      id: "ORD-001",
      customer: "Ahmed Ali",
      email: "ahmed@example.com",
      products: [
        { name: "Pagani Huayra T-Shirt", quantity: 2, price: 1500 },
        { name: "Predict Future T-Shirt", quantity: 1, price: 1200 },
      ],
      total: 4200,
      status: "pending",
      date: "2024-01-15",
      address: "Karachi, Pakistan",
    },
    {
      id: "ORD-002",
      customer: "Sara Khan",
      email: "sara@example.com",
      products: [{ name: "Universe Deepspac T-Shirt", quantity: 1, price: 1300 }],
      total: 1300,
      status: "processing",
      date: "2024-01-14",
      address: "Lahore, Pakistan",
    },
    {
      id: "ORD-003",
      customer: "Hassan Sheikh",
      email: "hassan@example.com",
      products: [{ name: "Not Okay T-Shirt", quantity: 3, price: 1100 }],
      total: 3300,
      status: "shipped",
      date: "2024-01-13",
      address: "Islamabad, Pakistan",
    },
    {
      id: "ORD-004",
      customer: "Fatima Malik",
      email: "fatima@example.com",
      products: [
        { name: "Pagani Huayra T-Shirt", quantity: 1, price: 1500 },
        { name: "Universe Deepspac T-Shirt", quantity: 2, price: 1300 },
      ],
      total: 4100,
      status: "delivered",
      date: "2024-01-12",
      address: "Faisalabad, Pakistan",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Package className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <Truck className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId, newStatus) => {
    // Yahan aap database mein order status update kar sakte hain
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <div className="text-sm text-gray-600">Total Orders: {orders.length}</div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search orders by customer name, order ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.customer} • {order.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.date} • {order.address}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Products */}
                <div>
                  <h4 className="font-medium mb-2">Products:</h4>
                  {order.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center py-1 text-sm">
                      <span>{product.name}</span>
                      <span>
                        Qty: {product.quantity} × Rs. {product.price} = Rs. {product.quantity * product.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total and Actions */}
                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="font-semibold">Total: Rs. {order.total}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    {order.status === "pending" && (
                      <Button size="sm" onClick={() => updateOrderStatus(order.id, "processing")}>
                        Mark Processing
                      </Button>
                    )}
                    {order.status === "processing" && (
                      <Button size="sm" onClick={() => updateOrderStatus(order.id, "shipped")}>
                        Mark Shipped
                      </Button>
                    )}
                    {order.status === "shipped" && (
                      <Button size="sm" onClick={() => updateOrderStatus(order.id, "delivered")}>
                        Mark Delivered
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}