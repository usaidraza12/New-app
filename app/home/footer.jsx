import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
            <ShoppingCart className="h-7 w-7 text-blue-400" />
            <span>E-Shop</span>
          </Link>
          <p className="text-sm text-center md:text-left">
            Apki style ke liye behtareen T-shirts. Quality aur Comfort ka wada.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/shop" className="hover:text-white transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-white transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/deals" className="hover:text-white transition-colors">
                Deals
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Humse Rabta Karein</h3>
          <p className="text-sm">Email: info@eshop.com</p>
          <p className="text-sm">Phone: +92 300 1234567</p>
          <p className="text-sm mt-2">123 Main Street, City, Country</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} E-Shop. Tamam Huqooq Mehfooz Hain.
      </div>
    </footer>
  )
}
