// import React from 'react';
// import Container from './container';

// const Navbar = () => {
//   return (
//     <div className='w-full flex justify-center bg-white '>
//     <Container>    
//     <nav className="flex justify-between items-center p-4 bg-white ">
      
//       <div className="flex  space-x-1">
       
//         <img src="https://www.finline.in/assets/v3/img/finline-logo.png" alt="Logo" className="h-[55%] w-[58%]" />
        
//       </div>

      
//       <div className="flex items-center space-x-6">
       
//         <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300">
//           Sign in
//         </button>

        
//         <div className="relative inline-block text-gray-600">
//           <button className="flex items-center">
//             English <span className="ml-1">&#9662;</span> 
//           </button>
          
//           <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg hidden group-hover:block">
//             <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">English</button>
//             <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">French</button>
//             <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Spanish</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//     </Container>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import Container from './container';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full flex justify-center bg-white shadow-md md:shadow-none">
      <Container>
        <nav className="flex justify-between items-center p-4 bg-white w-full">
          {/* Logo */}
          <div className="flex items-center space-x-1 md:order-1 order-2">
            <img
              src="https://www.finline.in/assets/v3/img/finline-logo.png"
              alt="Logo"
              className="md:h-8 w-auto h-6"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center md:order-2 space-x-6">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300">
              Sign in
            </button>

            {/* Language Selector */}
            <div className="relative inline-block text-gray-600">
              <button className="flex items-center">
                English <span className="ml-1">&#9662;</span>
              </button>

              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg hidden group-hover:block">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  English
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  French
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Spanish
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-white w-full absolute top-[60px] left-0 shadow-lg z-10">
            <div className="flex flex-col items-center p-4 space-y-4">
              {/* Sign In Button */}
              <button className="bg-purple-600 text-white px-4 py-2 rounded-full w-full hover:bg-purple-700 transition duration-300">
                Sign in
              </button>

              {/* Language Selector */}
              <div className="w-full text-gray-600">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  English
                </button>
                {/* <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  French
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Spanish
                </button> */}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
