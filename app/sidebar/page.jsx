// "use client"
// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';

// export default function UserAvatar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarRef = useRef(null);

//   // Sample user data
//   const user = {
//     name: 'John Doe',
//     email: 'john@example.com',
//     avatar: 'JD'
//   };

//   // Close sidebar when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleLogin = () => {
//     setIsLoggedIn(!isLoggedIn);
//     setIsSidebarOpen(false);
//   };

//   const handleAvatarClick = () => {
//     if (!isLoggedIn) {
//       // Redirect to login page if not logged in
//       window.location.href = '/login';
//       return;
//     }
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6">
//         {/* Header */}
//         <header className="flex justify-between items-center p-4 bg-white/15 rounded-xl mb-8">
//           <div className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
//               <span className="text-xl">⚡</span>
//             </div>
//             <h1 className="text-2xl font-bold text-white">NextJS App</h1>
//           </div>
          
//           {/* Avatar Button */}
//           <div className="relative" ref={sidebarRef}>
//             <button
//               onClick={handleAvatarClick}
//               className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
//             >
//               {isLoggedIn ? user.avatar : '?'}
//             </button>
            
//             {/* Sidebar */}
//             {isSidebarOpen && isLoggedIn && (
//               <div className="absolute right-0 top-14 w-72 bg-white rounded-xl shadow-2xl p-5 z-50 animate-fade-in">
//                 <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
//                   <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
//                     {user.avatar}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">{user.name}</h3>
//                     <p className="text-sm text-gray-500">{user.email}</p>
//                   </div>
//                 </div>
                
//                 <ul className="py-4 space-y-2">
//                   <li>
//                     <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
//                       <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
//                         👤
//                       </div>
//                       <span className="text-gray-700">Profile</span>
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
//                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//                         ⚙️
//                       </div>
//                       <span className="text-gray-700">Settings</span>
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
//                       <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
//                         💳
//                       </div>
//                       <span className="text-gray-700">Billing</span>
//                     </a>
//                   </li>
//                 </ul>
                
//                 <div className="pt-3 border-t border-gray-100">
//                   <button 
//                     onClick={toggleLogin}
//                     className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-200"
//                   >
//                     <span>🚪</span>
//                     <span>Log Out</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </header>
        
//         {/* Main Content */}
//         <div className="text-center py-12">
//           <h2 className="text-4xl font-bold text-white mb-6">User Avatar Component</h2>
//           <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
//             This component shows a user avatar that displays a sidebar when logged in and redirects to login when logged out.
//           </p>
          
//           <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
//             <div className="flex items-center justify-between mb-6">
//               <span className="text-white font-medium">Current Status:</span>
//               <span className={`px-4 py-1 rounded-full ${isLoggedIn ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
//                 {isLoggedIn ? 'Logged In' : 'Logged Out'}
//               </span>
//             </div>
            
//             <button
//               onClick={toggleLogin}
//               className="w-full bg-white/30 hover:bg-white/40 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
//             >
//               {isLoggedIn ? 'Log Out' : 'Log In'}
//             </button>
            
//             <p className="text-white/80 text-sm mt-6">
//               Click the avatar button in the top right to {isLoggedIn ? 'see user menu' : 'be redirected to login'}.
//             </p>
//           </div>
//         </div>
//       </div>
      
//       {/* Footer */}
//       <footer className="mt-12 text-center text-white/80">
//         <p>Built with Next.js and Tailwind CSS</p>
//       </footer>
//     </div>
//   );
// }