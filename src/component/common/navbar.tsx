import React, { useState } from 'react';
import Container from './container';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);    
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="w-full flex justify-center bg-white shadow-md md:shadow-none">
      <Container>
        <nav className="flex justify-between items-center p-4 bg-white w-full">
          <div className="flex items-center space-x-1 order-2 md:order-1">
            <img
              src="https://www.finline.in/assets/v3/img/finline-logo.png"
              alt="Logo"
              className="md:h-8 w-auto h-6"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 md:order-2">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300">
              Sign in
            </button>

            
            <div className="relative inline-block text-gray-600">
              <button onClick={toggleDropdown} className="flex items-center">
                English <span className="ml-1">&#9662;</span>
              </button>

             
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 z-10 bg-white border rounded shadow-lg">
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
              )}
            </div>
          </div>

          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-white w-full absolute top-[60px] left-0 shadow-lg z-10">
            <div className="flex flex-col items-center p-4 space-y-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-full w-full hover:bg-purple-700 transition duration-300">
                Sign in
              </button>

              <div className="w-full text-gray-600">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  English
                </button>
                
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
