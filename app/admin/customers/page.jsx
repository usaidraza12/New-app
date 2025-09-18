"use client"

import { useState } from "react"
import { Button } from "../../component/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../component/ui/card"
import { Input } from "../../component/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../component/ui/select"
import { Search, Eye, Mail, Phone } from "lucide-react"

// Mock customer data - replace with real data from your database
const mockCustomers = [
  {
    id: 1,
    name: "Ahmad Ali",
    email: "ahmad@example.com",
    phone: "+92 300 1234567",
    totalOrders: 5,
    totalSpent: 234.95,
    lastOrder: "2024-01-15",
    status: "active",
    joinDate: "2023-08-15",
  },
  {
    id: 2,
    name: "Fatima Khan",
    email: "fatima@example.com",
    phone: "+92 301 9876543",
    totalOrders: 3,
    totalSpent: 156.97,
    lastOrder: "2024-01-14",
    status: "active",
    joinDate: "2023-09-22",
  },
  {
    id: 3,
    name: "Hassan Ahmed",
    email: "hassan@example.com",
    phone: "+92 302 5555555",
    totalOrders: 8,
    totalSpent: 445.92,
    lastOrder: "2024-01-13",
    status: "vip",
    joinDate: "2023-06-10",
  },
  {
    id: 4,
    name: "Ayesha Malik",
    email: "ayesha@example.com",
    phone: "+92 303 7777777",
    totalOrders: 2,
    totalSpent: 89.98,
    lastOrder: "2024-01-12",
    status: "active",
    joinDate: "2023-11-05",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  vip: "bg-purple-100 text-purple-800",
  inactive: "bg-gray-100 text-gray-800",
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-2">Manage your customer relationships</p>
        </div>
        <Button variant="outline">Export Customers</Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customers by name or email..."
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
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Orders</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Order</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-600">ID: {customer.id}</p>
                        <p className="text-sm text-gray-600">
                          Joined: {new Date(customer.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{customer.totalOrders}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">${customer.totalSpent.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{new Date(customer.lastOrder).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${statusColors[customer.status]}`}
                      >
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
