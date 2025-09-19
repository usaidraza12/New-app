"use client"



import { useState, useEffect } from "react"
import { Button } from "../../../../component/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../component/ui/card"
import { Input } from "../../../../component/ui/input"
import { Label } from "../../../../component/ui/label"
import { Upload, X, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import axios from "axios"

export default function AdProductPage() {
  const router = useRouter();
  const { id } = useParams();
  // console.log(id)

  const [filef, setFilef] = useState(null)
  const [imagePreview, setImagePreview] = useState([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    sizes: [],
  })

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  // 🔹 Fetch product detail
  useEffect(() => {
    if (!id) return
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        setFormData(res.data) // product details ko formData me set kar diya
        setLoading(false)
      })
      .catch((err) => console.error(err))
  }, [id])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFilef(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview([reader.result])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index))
    setFilef(null)
  }

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }))
  }

  // 🔹 Update Product
  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      let payload = { ...formData }

      // Agar nayi image select ki hai to usko bhi bhejo
      if (filef) {
        const data = new FormData()
        data.append("image", filef)
        data.append("myData", JSON.stringify(formData))
        await axios.put(`/api/products/${id}`, data)
      } else {
        await axios.put(`/api/products/${id}`, payload)
      }

      alert("Product updated successfully ✅")
      router.push("/admin/products")
    } catch (err) {
      console.error("Update Error:", err)
      alert("Something went wrong!")
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600 mt-2">Update the details of your product</p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Product Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category">Category: </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                  >
                    <option value="">-- Select Category --</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    placeholder="Enter stock quantity"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="p-1 m-1 gap-1">
                  <Label htmlFor="price" className="m-1">
                    Price
                  </Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div className="p-1 m-1">
                  <Label htmlFor="description" className="m-1">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Description"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="images" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Upload product image
                        </span>
                        <input
                          id="images"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {imagePreview.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`p-2 text-sm border rounded-md transition-colors ${
                        formData.sizes.includes(size)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit" className="w-full">
                  Update Product
                </Button>
                <Link href="/admin/products" className="block">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
// import { useState ,useEffect} from "react"
// import { Button } from "../../../../component/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "../../../../component/ui/card"
// import { Input } from "../../../../component/ui/input"
// import { Label } from "../../../../component/ui/label"
// import { Textarea } from "../../../../component/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../component/ui/select"
// import { ArrowLeft, Upload, X } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useParams } from "next/navigation"
// import axios from "axios"


// export default function AdProductPage() {
//   const router = useRouter();
//    const [filef, setFilef] = useState(null);
//  const { id } = useParams()  ;
//  console.log(id)

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     sizes: [],
//   })
//   const [loading, setLoading] = useState(true)

// //  const toBase64 = (filef) =>
// //     new Promise((resolve, reject) => {
// //       const reader = new FileReader();
// //       reader.readAsDataURL(filef);
// //       reader.onload = () => resolve(reader.result);
// //       reader.onerror = (error) => reject(error);
// //     });
//     useEffect(() => {
//     if (!id) return
//     axios.get(`/api/products/${id}`)
//       .then(res => {
//         setProduct(res.data)
//         setLoading(false)
//       })
//       .catch(err => console.error(err))
//   }, [id])
//   const [imagePreview, setImagePreview] = useState([])
//   const [category, setCategory] = useState("")
//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }


//   const removeImage = (index) => {
//     setImagePreview((prev) => prev.filter((_, i) => i !== index))
//   }

//   const handleSizeToggle = (size) => {
//     setFormData((prev) => ({
//       ...prev,
//       sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
   
//     // Here you would typically send the data to your backend API
//     console.log("Product data:", formData)

//     // Simulate API call
//     alert("Product added successfully!")
//     router.push("/admin/products")
//   }

//      const handleFileChange = (e) => {
//     setFilef(e.target.files[0]);
//       console.log(filef)

//   };
//     const handleUpdate = async () => {
//     try {
//       await axios.put(`/api/products/${id}`, product) // update API call
//       alert("Product updated successfully ✅")
//       router.push("/products") // wapas list ya detail page pe bhej do
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   if (loading) return <p>Loading...</p>
//   if (!product) return <p>No product found</p>

// // const handleclick = async () => {
// //     if (!filef) return alert("Please select a file!");

// //     try {
// //       const base64File = await toBase64(filef);

// //       // 👇 object + file ek hi body me send
// //       const payload = {
// //         product: data,
// //         file: base64File,
// //       };

// //       const res = await axios.post("/api/upload", payload);
// //       console.log("Upload success:", res.data);
// //     } catch (err) {
// //       console.error("Upload error:", err);
// //     }
// //   };


//   const handleUplo = async (e) => {
//     e.preventDefault()
//     if (!filef) return alert("Please select a file");

//     const Data = new FormData();
//     Data.append("image", filef);
//       Data.append("myData",JSON.stringify(formData))
//     // Data.append("price",formData.price)
//     // Data.append("stock",formData.stock)
//     // Data.append("size",formData.size)
//     // Data.append("category",formData.category)
//     // Data.append("description",formData.description)

//     try {
//       const res = await axios.post("/api/route", Data);
//       router.replace('/admin/products')
//     } catch (err) {
//       console.error("Error uploading file:", err);
//     }
//   };
//   const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

//   return (
//     <div>
//       <div className="flex items-center gap-4 mb-8">
//         <Link href="/admin/products">
//           <Button variant="ghost" size="sm">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Products
//           </Button>
//         </Link>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
//           <p className="text-gray-600 mt-2">Create a new product for your store</p>
//         </div>
//       </div>

//       <form className="space-y-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Product Info */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Product Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <Label htmlFor="name">Product Name</Label>
//                   <Input
//                     id="name"
//                     value={formData.name}
//                     onChange={(e) => handleInputChange("name", e.target.value)}
//                     placeholder="Enter product name"
//                     required
//                   />
//                 </div>

//            <div>
//       <label htmlFor="category">Category: </label>
//       <select
//         id="category"
//         value={formData.category}
//         onChange={(e) => handleInputChange("category",e.target.value)}
//       >
//         <option value="">-- Select Category --</option>
//         <option value="t-shirts">T-Shirts</option>
//         <option value="hoodies">Hoodies</option>
//         <option value="accessories">Accessories</option>
//       </select>

//       <p>Selected: {formData.category || "None"}</p>
//     </div>


//                 <div>
//                   <Label htmlFor="stock">Stock Quantity</Label>
//                   <Input
//                     id="stock"
//                     type="number"
//                     value={formData.stock}
//                     onChange={(e) => handleInputChange("stock", e.target.value)}
//                     placeholder="Enter stock quantity"
//                     required
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent>
//                 <div className="p-1 m-1 gap-1">
//                   <Label htmlFor="price" className="m-1">Price</Label>
//                   <Input
//                     id="price"
//                     value={formData.price}
//                     onChange={(e) => handleInputChange("price", e.target.value)}
//                     placeholder="Enter price"
//                     required
//                   />
//                 </div>

//                  <div className="p-1 m-1">
//                   <Label htmlFor="price" className="m-1">Discription</Label>
//                   <Input
//                     id="price"
//                     value={formData.description}
//                     onChange={(e) => handleInputChange("description", e.target.value)}
//                     placeholder="Desription"
//                     required
//                   />
//                 </div>

//               </CardContent>
//             </Card>

//             {/* Product Images */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Product Images</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <div className="mt-4">
//                       <label htmlFor="images" className="cursor-pointer">
//                         <span className="mt-2 block text-sm font-medium text-gray-900">Upload product images</span>
//                         <input
//                           id="images"
//                           type="file"
//                           multiple
//                           accept="image/*"
//                           onChange={handleFileChange}
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                   </div>

//                   {imagePreview.length > 0 && (
//                     <div className="grid grid-cols-3 gap-4">
//                       {imagePreview.map((image, index) => (
//                         <div key={index} className="relative">
//                           <img
//                             src={image || "/placeholder.svg"}
//                             alt={`Preview ${index + 1}`}
//                             className="w-full h-24 object-cover rounded-lg"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                           >
//                             <X className="h-3 w-3" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Available Sizes</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-3 gap-2">
//                   {sizes.map((size) => (
//                     <button
//                       key={size}
//                       type="button"
//                       onClick={() => handleSizeToggle(size)}
//                       className={`p-2 text-sm border rounded-md transition-colors ${
//                         formData.sizes.includes(size)
//                           ? "bg-blue-500 text-white border-blue-500"
//                           : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Actions</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <Button type="submit" className="w-full" onClick={handleUplo}>
//                   Add Product
//                 </Button>
//                 <Link href="/admin/products" className="block">
//                   <Button type="button" variant="outline" className="w-full bg-transparent">
//                     Cancel
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }
