// components/Navbar.js
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import Checkout from "./Checkout";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();
  const { getCartCount, isCheckoutOpen, openCheckout, closeCheckout } = useCart();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-red-600">AlMokhtabar</h1>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-2">
              <button
                onClick={() => navigate("/landing")}
                className="text-red-600 border-red-500 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200 bg-red-50"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/analytics")}
                className="text-gray-700 hover:text-red-600 hover:bg-red-50 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Analytics
              </button>
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 hover:bg-red-50 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Results
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 hover:bg-red-50 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Appointments
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 hover:bg-red-50 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                History
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={openCheckout}
              className="relative p-2 text-gray-600 hover:text-red-600 transition duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 -mt-1 -mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-red-500 text-xs text-white">
                    {getCartCount()}
                  </span>
                </span>
              )}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-red-50 transition duration-200"
              >
                <img
                  className="h-8 w-8 rounded-full border-2 border-red-100"
                  src={user.picture}
                  alt={user.name}
                />
                <span className="text-gray-700 text-sm font-medium hidden md:block">
                  {user.name}
                </span>
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                      role="menuitem"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/favorites");
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                      role="menuitem"
                    >
                      <div className="flex items-center justify-between">
                        <span>Favorite Items</span>
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                          {favorites.tests.length + favorites.packages.length}
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Navigate to settings page when implemented
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                      role="menuitem"
                    >
                      Settings
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Checkout Modal */}
      <Checkout isOpen={isCheckoutOpen} onClose={closeCheckout} />
    </nav>
  );
};

export default Navbar;
