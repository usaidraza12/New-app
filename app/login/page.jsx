
"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const res = await axios.post("/api/Auth/login", { email, password });
      
     
//       router.replace("/shop");


//       // 🚀 redirect user after login
//       // router.replace("/");
//     } catch (err) {
// if(err){
//       setError(err.response?.data?.message || "Login failed");

//       router.replace("/register")

// }

//     } finally {
//       setIsLoading(false);
//     }
//   };
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    const res = await axios.post(
      "/api/Auth/login",
      { email, password },
      { withCredentials: true } // 🔥 important
    );
// console.log(res.data.role)

    //  window.location.reload();
          // router.reload();
          router.replace("/");
    //  window.location.reload();



       // ✅ ab yahan redirect hoga
    
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
    router.replace("/register"); // ❌ isko sirf error hone par chalana sahi hai
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="px-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Link href="/register" className="underline">Signup account</Link>


          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? "bg-gray-600" : "bg-black hover:bg-gray-800"
            } text-white py-2 rounded-md transition`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
