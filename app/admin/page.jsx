
import { Card ,CardContent,CardHeader,CardTitle} from "../component/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  // Mock data - replace with real data from your database
  const stats = [
    {
      title: "Total Products",
      value: "156",
      icon: Package,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Total Orders",
      value: "2,345",
      icon: ShoppingCart,
      change: "+23%",
      changeType: "positive",
    },
    {
      title: "Total Customers",
      value: "1,234",
      icon: Users,
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Revenue",
      value: "$45,678",
      icon: DollarSign,
      change: "+15%",
      changeType: "positive",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-gray-600">Customer {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 100 + 20).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Pagani Huayra T-Shirt",
                "Predict Future T-Shirt",
                "Universe Deepspac T-Shirt",
                "Not Okay T-Shirt",
                "Classic Black Tee",
              ].map((product, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product}</p>
                    <p className="text-sm text-gray-600">{Math.floor(Math.random() * 50 + 10)} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 30 + 15).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
