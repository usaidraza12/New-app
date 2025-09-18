"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "../../component/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../component/ui/card"
import { Input } from "../../component/ui/input"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/route/admin")
        setProducts(res.data?.data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = (products || []).filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (name) => {
    try {
      await fetch("/api/route/admin", {
        method: "DELETE",
        body: JSON.stringify({ name }),
      })
      setProducts((items) => items.filter((item) => item.name !== name))
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </div>
        <Link href="/admin/products/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      Loading products...
                    </td>
                  </tr>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`/${product.image}`}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">ID: {product._id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">{product.category}</td>
                      <td className="py-4 px-4 font-medium">${product.price}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            product.stock > 20
                              ? "bg-green-100 text-green-800"
                              : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            product.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Link href={`/admin/products/edit/${product._id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.name)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// "use client"

// import { useState ,useEffect} from "react"
// // import { Button } from "@/components/ui/button"
// import axios from "axios"
// import { Button } from "../../component/ui/button"
// import Image from "next/image"
// import { Card, CardContent, CardHeader, CardTitle } from "../../component/ui/card"
// // import { Input } from "@/components/ui/input"
// import { Input } from "../../component/ui/input"
// import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
// import Link from "next/link"

// // Mock product data - replace with real data from your database


// export default function ProductsPage() {
//   const [prod,setProd]=useState([]);


//     useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const res = await axios.get("/api/route/admin");
//         setProducts(res.data.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const [products, setProducts] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")

//   const filteredProducts = products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.category.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const handleDelete = async (name) => {
//     try {
//       // Yahan aap database delete API call karenge
//       await fetch('http://localhost:3000/api/route/admin', {
//         method: 'DELETE',
//         body: JSON.stringify({name})
//       })
//      window.location.reload(true);

//       setCartItems((items) => items.filter((item) => item.name !== name))
//     } catch (error) {
//       console.error("Error removing item:", error)
//     }
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Products</h1>
//           <p className="text-gray-600 mt-2">Manage your product inventory</p>
//         </div>
//         <Link href="/admin/products/add">
//           <Button className="flex items-center gap-2">
//             <Plus className="h-4 w-4" />
//             Add Product
//           </Button>
//         </Link>
//       </div>

//       {/* Search and Filters */}
//       <Card className="mb-6">
//         <CardContent className="pt-6">
//           <div className="flex gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Products Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>All Products ({filteredProducts.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.length > 0?(filteredProducts.map((product) => (
//                   <tr key={product.name} className="border-b hover:bg-gray-50">
//                     <td className="py-4 px-4">
//                       <div className="flex items-center gap-3">
//                         {/* <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-12 h-12 object-cover rounded-lg"
//                         /> */}
//                         <img
//   src={`/${product.image}`}
//   alt={product.name}
//   className="w-12 h-12 object-cover rounded-lg"
// />
//                         <div>
//                           <p className="font-medium text-gray-900">{product.name}</p>
//                           <p className="text-sm text-gray-600">ID: {product.id}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-4 text-gray-600">{product.category}</td>
//                     <td className="py-4 px-4 font-medium">${product.price}</td>
//                     <td className="py-4 px-4">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs ${
//                           product.stock > 20
//                             ? "bg-green-100 text-green-800"
//                             : product.stock > 0
//                               ? "bg-yellow-100 text-yellow-800"
//                               : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {product.stock} units
//                       </span>
//                     </td>
//                     <td className="py-4 px-4">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs ${
//                           product.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {product.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-4">
//                       <div className="flex items-center gap-2">
//                         <Button variant="ghost" size="sm">
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                         <Link href={`/admin/products/edit/${product._id}`}>
//                           <Button variant="ghost" size="sm" >
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                         </Link>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleDelete(product.name)}
//                           className="text-red-600 hover:text-red-700"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))):(
//                   <tr>
//     <td colSpan="6" className="py-4 text-center text-gray-500">
//       Loading products...
//     </td>
//   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
