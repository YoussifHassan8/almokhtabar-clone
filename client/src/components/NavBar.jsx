// components/Navbar.js
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, signOut } = useAuth();
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
              <a
                href="#"
                className="text-red-600 border-red-500 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200 bg-red-50"
              >
                Dashboard
              </a>
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

          <div className="flex items-center">
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
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                      role="menuitem"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                      role="menuitem"
                    >
                      Settings
                    </a>
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
    </nav>
  );
};

export default Navbar;