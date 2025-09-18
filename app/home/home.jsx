"use client"

   import { useState } from "react"
   import Link from "next/link"
   import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
   import { Menu, ChevronRight, ShoppingCart, User, Search, X } from "lucide-react"
//    "use client"
import { incrementC } from "../context/counterSlice";
// import { useState } from "react"
// import Link from "next/link"
// import { Menu, ChevronRight, ShoppingCart, User, Search, X } from "lucide-react"
//    import { useCart } from "../context/Counter"

//    Sample navigation data
//    const navLinks = [
//      {
//        title: "Shop",
//        href: "/shop",
//      },
//      {
//        title: "Categories",
//        items: [
//          { title: "Electronics", href: "/categories/electronics" },
//          { title: "Apparel", href: "/categories/apparel" },
//          { title: "Home Goods", href: "/categories/home-goods" },
//          { title: "Books", href: "/categories/books" },
//        ],
//      },
//      {
//        title: "Deals",
//        href: "/deals",
//      },
//      {
//        title: "About Us",
//        href: "/about",
//      },
//      {
//        title: "Contact",
//        href: "/contact",
//      },
//    ]

//    export default function Navbar() {
//      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//      const [openMobileSubMenu, setOpenMobileSubMenu] = useState(null)    To track which sub-menu is open
//      const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
//      const { getTotalItems, toggleCart } = useCart()

//      const toggleMobileMenu = () => {
//        setIsMobileMenuOpen(!isMobileMenuOpen)
//        if (!isMobileMenuOpen) {
//          setOpenMobileSubMenu(null)    Close any open sub-menus when main menu opens
//        }
//      }

//      const toggleSubMenu = (title) => {
//        setOpenMobileSubMenu(openMobileSubMenu === title ? null : title)
//      }

//      const closeAllMenus = () => {
//        setIsMobileMenuOpen(false)
//        setOpenMobileSubMenu(null)
//        setIsUserMenuOpen(false)    Close user menu when closing all menus
//      }

//      const toggleUserMenu = () => {
//        setIsUserMenuOpen(!isUserMenuOpen)
//      }

//      const closeUserMenu = () => {
//        setIsUserMenuOpen(false)
//      }

//      return (
//        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
//          <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
//            {/* Mobile Menu Trigger */}
//            <button
//              onClick={toggleMobileMenu}
//              className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//              aria-label="Toggle navigation menu"
//              aria-expanded={isMobileMenuOpen}
//            >
//              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//            </button>

//            {/* Desktop Logo */}
//            <Link href="/" className="mr-6 hidden lg:flex items-center gap-2 text-lg font-semibold text-gray-800">
//              <ShoppingCart className="h-6 w-6 text-blue-600" />
//              <span>E-Shop</span>
//            </Link>

//            {/* Mobile Menu (Overlay) */}
//            {isMobileMenuOpen && (
//              <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleMobileMenu}></div>
//            )}
//            <nav
//              className={`fixed top-0 left-0 h-full w-[300px] sm:w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
//                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//              }`}
//              aria-label="Mobile navigation"
//            >
//              <div className="flex items-center justify-between p-4 border-b">
//                <Link
//                  href="/"
//                  className="flex items-center gap-2 text-lg font-semibold text-gray-800"
//                  onClick={closeAllMenus}
//                >
//                  <ShoppingCart className="h-6 w-6 text-blue-600" />
//                  <span>E-Shop</span>
//                </Link>
//                <button
//                  onClick={toggleMobileMenu}
//                  className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//                  aria-label="Close navigation menu"
//                >
//                  <X className="h-6 w-6" />
//                </button>
//              </div>
//              <ul className="grid gap-2 py-6 px-4">
//                {navLinks.map((link) => (
//                  <li key={link.title}>
//                    {link.items ? (
//                      <>
//                        <button
//                          onClick={() => toggleSubMenu(link.title)}
//                          className="flex w-full items-center py-2 text-lg font-semibold text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
//                          aria-expanded={openMobileSubMenu === link.title}
//                        >
//                          {link.title}{" "}
//                          <ChevronRight
//                            className={`ml-auto h-5 w-5 transition-transform ${openMobileSubMenu === link.title ? "rotate-90" : ""}`}
//                          />
//                        </button>
//                        <div
//                          className={`grid gap-2 pl-4 transition-all duration-300 ease-in-out ${
//                            openMobileSubMenu === link.title
//                              ? "max-h-screen opacity-100"
//                              : "max-h-0 opacity-0 overflow-hidden"
//                          }`}
//                        >
//                          {link.items.map((subLink) => (
//                            <Link
//                              key={subLink.title}
//                              href={subLink.href}
//                              className="flex w-full items-center py-2 text-base font-medium text-gray-600 hover:text-blue-600"
//                              onClick={closeAllMenus}
//                            >
//                              {subLink.title}
//                            </Link>
//                          ))}
//                        </div>
//                      </>
//                    ) : (
//                      <Link
//                        href={link.href}
//                        className="flex w-full items-center py-2 text-lg font-semibold text-gray-700 hover:text-blue-600"
//                        onClick={closeAllMenus}
//                      >
//                        {link.title}
//                      </Link>
//                    )}
//                  </li>
//                ))}
//              </ul>
//            </nav>

//            {/* Desktop Navigation */}
//            <nav className="hidden lg:flex flex-grow justify-center" aria-label="Main navigation">
//              <ul className="flex space-x-6">
//                {navLinks.map((link) => (
//                  <li key={link.title} className="relative group">
//                    {link.items ? (
//                      <>
//                        <button className="flex items-center h-9 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600">
//                          {link.title} <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:rotate-90" />
//                        </button>
//                        <ul className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform group-hover:translate-y-0 -translate-y-2">
//                          {link.items.map((subLink) => (
//                            <li key={subLink.title}>
//                              <Link
//                                href={subLink.href}
//                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md"
//                              >
//                                {subLink.title}
//                              </Link>
//                            </li>
//                          ))}
//                        </ul>
//                      </>
//                    ) : (
//                      <Link
//                        href={link.href}
//                        className="inline-flex h-9 items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
//                      >
//                        {link.title}
//                      </Link>
//                    )}
//                  </li>
//                ))}
//              </ul>
//            </nav>

//            {/* Right-aligned actions */}
//            <div className="ml-auto flex items-center gap-2">
//              <button
//                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//                aria-label="Search"
//              >
//                <Search className="h-5 w-5 text-gray-700" />
//                <span className="sr-only">Search</span>
//              </button>

//              <div className="relative">
//                <button
//                  onClick={toggleUserMenu}
//                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//                  aria-label="Account"
//                  aria-expanded={isUserMenuOpen}
//                >
//                  <User className="h-5 w-5 text-gray-700" />
//                  <span className="sr-only">Account</span>
//                </button>

//                {/* User dropdown menu */}
//                {isUserMenuOpen && (
//                  <>
//                    {/* Backdrop to close menu when clicking outside */}
//                    <div className="fixed inset-0 z-10" onClick={closeUserMenu}></div>

//                    {/* Dropdown menu */}
//                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
//                      <div className="py-1">
//                        <Link
//                          href="/login"
//                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                          onClick={closeUserMenu}
//                        >
//                          Login
//                        </Link>
//                        <Link
//                          href="/register"
//                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                          onClick={closeUserMenu}
//                        >
//                          Register
//                        </Link>
//                        <Link
//                          href="/profile"
//                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                          onClick={closeUserMenu}
//                        >
//                          My Profile
//                        </Link>
//                        <Link
//                          href="/orders"
//                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                          onClick={closeUserMenu}
//                        >
//                          My Orders
//                        </Link>
//                        <hr className="my-1" />
//                        <Link
//                          href="/admin"
//                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                          onClick={closeUserMenu}
//                        >
//                          Admin Panel
//                        </Link>
//                      </div>
//                    </div>
//                  </>
//                )}
//              </div>

//              <button
//                onClick={toggleCart}
//                className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//                aria-label="Cart"
//              >
//                <ShoppingCart className="h-5 w-5 text-gray-700" />
//                {getTotalItems() > 0 && (
//                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                    {getTotalItems()}
//                  </span>
//                )}
//                <span className="sr-only">Cart</span>
//              </button>
//            </div>
//          </div>
//        </header>
//      )
//    }

   const navLinks = [
  
     { title: "Home", href: "/" },
     { title: "Shop", href: "/shop" },
     {
       title: "Categories", items: [
         { title: "Men", href: "/" },
         { title: "Women", href: "/" },
       ],
     },
     { title: "Deals", href: "/" },
     { title: "About Us", href: "/about" },
     { title: "Contact", href: "/" },
   ]

   export default function Navbar() {
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
     const [openMobileSubMenu, setOpenMobileSubMenu] = useState(null)
     const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
const router= useRouter();
const dispetch =useDispatch();
const cartCount = useSelector((state)=>state.counter.cart.length);

  // const info = useSelector((state)=>(state.counter.data))

     const [isOn, setIsOn] = useState(false);
     const [openMobileSub, setOpenMobileSub] = useState(null)    

     const toggleMobileMenu = () => {
       setIsMobileMenuOpen(!isMobileMenuOpen)
       if (!isMobileMenuOpen) setOpenMobileSubMenu(null)
     }
   const toggleUserMenu = () => {
       setIsUserMenuOpen(!isUserMenuOpen)
     }
     const toggleSubMenu = (title) => {
       setOpenMobileSubMenu(openMobileSubMenu === title ? null : title)
     }
   const closeUserMenu = () => {
       setIsUserMenuOpen(false)
     }
    const handleTog = () => {
       setIsOn(!isOn);
     };
     const closeAllMenus = () => {
       setIsMobileMenuOpen(false)
       setOpenMobileSubMenu(null)
     }
const handleLogout = () => {
    // 🔹 Cookies clear karo
    Cookies.remove("token");  
    Cookies.remove("id");  

    // 🔹 LocalStorage clear karna ho to
    localStorage.clear();

    // 🔹 Redirect to login page
    router.push("/login");
  };
     return (
       <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
         <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
           {/* Mobile Menu Button */}
           <button
             onClick={toggleMobileMenu}
             className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
           >
             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
           </button>

           {/* Logo */}
           <Link href="/" className="mr-6 flex items-center gap-2 text-lg font-semibold text-gray-800">
             <ShoppingCart className="h-6 w-6 text-blue-600" />
             <span>Germents Wale</span>
           </Link>

           {/* Desktop Navigation */}
           <nav className="hidden lg:flex flex-grow justify-center  text-2xl ">
             <ul className="flex space-x-6">
               {navLinks.map((link) => (
                 <li key={link.title} className="relative group">
                   {link.items ? (
                     <>
                         <button className="flex items-center h-9 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 mt-1">
                           {link.title}
                           <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:rotate-90" />
                         </button>
                       {/* Dropdown with white background */}
                       <ul className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg 
                                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                         {link.items.map((subLink) => (
                           <li key={subLink.title}>
                             <Link
                               href={subLink.href}
                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md"
                             >
                               {subLink.title}
                             </Link>
                           </li>
                         ))}
                       </ul>
                     </>
                   ) : (
                     <Link
                       href={link.href}
                       className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                     >
                       {link.title}
                     </Link>
                   )}
                 </li>
               ))}
             </ul>
           </nav>

           {/* Right Actions */}
           <div className="ml-auto flex items-center gap-3">
             {/* <button className="p-2 rounded-full hover:bg-gray-100">
               <Search className="h-5 w-5 text-gray-700" />
             </button> */}
               <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Account"
              aria-expanded={isUserMenuOpen}
            >
              <User className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Account</span>
            </button>

            {/* User dropdown menu */}
            {isUserMenuOpen && (
              <>
                {/* Backdrop to close menu when clicking outside */}
                <div className="fixed inset-0 z-10" onClick={closeUserMenu}></div>

                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="py-1">
                    {/* <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={closeUserMenu}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={closeUserMenu}
                    >
                      Register
                    </Link> */}
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={closeUserMenu}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/cart"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={closeUserMenu}
                    >
                      My Orders
                    </Link>
                    <hr className="my-1" />
                    {/* <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={closeUserMenu}
                    >
                      Admin Panel
                    </Link> */}
                  </div>
                <button
      onClick={handleLogout}
      className="px-4 py-1 m-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-300 transition-colors font-medium"
    >
      Logout
    </button>
                </div>
              </>
            )}
            </div>
             <Link href="/cart" className="relative">
               <button className="p-2 rounded-full hover:bg-gray-100">
                   {/* Badge */}
                {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
          {cartCount}
        </span>
      )}

        
                 <ShoppingCart size={28} className="h-5 w-5 text-gray-700" 
                 
                 />
                 <h2 className="text-xl font-semibold text-gray-800">
  
</h2>
               </button>
             </Link>
         </div>
      </div>

       {/* Mobile Menu Overlay */}
       {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleMobileMenu}></div>
      )}

      {/* Mobile Sidebar Menu */}
      <nav
        className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out 
         ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
     >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-gray-800" onClick={closeAllMenus}>
            <ShoppingCart className="h-6 w-6 text-blue-600" />
            <span>Germents Wale</span>
          </Link>
          <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>
        <ul className="grid gap-2 py-6 px-4">
          {navLinks.map((link) => (
            <li key={link.title}>
              {link.items ? (
                <>
                  <button
                    onClick={() => toggleSubMenu(link.title)}
                    className="flex w-full items-center py-2 text-lg font-semibold text-gray-700 hover:text-blue-600"
                  >
                    {link.title}
                    <ChevronRight
                      className={`ml-auto h-5 w-5 transition-transform ${openMobileSub === link.title ? "rotate-90" : ""}`}
                    />
                  </button>
                  {openMobileSub === link.title && (
                    <div className="grid gap-2 pl-4">
                      {link.items.map((subLink) => (
                        <Link
                          key={subLink.title}
                          href={subLink.href}
                          className="block py-2 text-base text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                          onClick={closeAllMenus}
                        >
                          {subLink.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className="block py-2 text-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                  onClick={closeAllMenus}
                >
                  {link.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

