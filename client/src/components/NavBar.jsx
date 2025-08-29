// components/Navbar.js
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import Checkout from "./Checkout";
import {
  IoCart,
  IoHomeOutline,
  IoAnalyticsOutline,
  IoDocumentTextOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoChevronDown,
  IoMenu,
  IoClose,
  IoLocation,
} from "react-icons/io5";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();
  const { getCartCount, isCheckoutOpen, openCheckout, closeCheckout } =
    useCart();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest("[data-hamburger]")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/landing", name: "Dashboard", icon: IoHomeOutline },
    { path: "/analytics", name: "Analytics", icon: IoAnalyticsOutline },
    { path: "/branches", name: "Branches", icon: IoLocation },
    { path: "/appointments", name: "Appointments", icon: IoCalendarOutline },
    { path: "/history", name: "History", icon: IoTimeOutline },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section - Logo and hamburger menu */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1
                className="text-2xl font-bold text-red-600 cursor-pointer"
                onClick={() => navigate("/landing")}
              >
                AlMokhtabar
              </h1>
            </div>
          </div>

          {/* Right section - Navigation, cart, user menu */}
          <div className="flex items-center space-x-4">
            {/* Navigation items - visible on medium screens and up */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? "text-red-600 bg-red-50 border-b-2 border-red-600"
                        : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <IconComponent className="mr-1.5 h-4 w-4" />
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Cart button */}
            <button
              onClick={openCheckout}
              className="relative p-2 text-gray-600 hover:text-red-600 transition duration-200 rounded-lg hover:bg-red-50"
              aria-label="Shopping cart"
            >
              <IoCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-red-500 text-xs text-white font-medium">
                    {getCartCount()}
                  </span>
                </span>
              )}
            </button>

            {/* User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none p-1 rounded-lg hover:bg-red-50 transition duration-200"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover border-2 border-red-100"
                  src={user.picture}
                  alt={user.name}
                />
                <span className="text-gray-700 text-sm font-medium hidden md:block">
                  {user.name}
                </span>
                <IoChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden transition-all duration-200 transform opacity-100 scale-100">
                  <div className="py-2" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                      role="menuitem"
                    >
                      <IoPersonOutline className="mr-3 h-5 w-5 text-gray-400" />
                      Your Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/favorites");
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                      role="menuitem"
                    >
                      <IoHeartOutline className="mr-3 h-5 w-5 text-gray-400" />
                      <div className="flex items-center justify-between flex-1">
                        <span>Favorite Items</span>
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                          {favorites.tests.length + favorites.packages.length}
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        // TODO: Navigate to settings page when implemented
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                      role="menuitem"
                    >
                      <IoSettingsOutline className="mr-3 h-5 w-5 text-gray-400" />
                      Settings
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={signOut}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition duration-150"
                      role="menuitem"
                    >
                      <IoLogOutOutline className="mr-3 h-5 w-5" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger menu for mobile */}
            <button
              data-hamburger
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-red-50 focus:outline-none"
              aria-label="Main menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <IoClose className="h-6 w-6" />
              ) : (
                <IoMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-red-600 bg-red-50"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <IconComponent className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover border-2 border-red-100"
                  src={user.picture}
                  alt={user.name}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                <IoPersonOutline className="mr-3 h-5 w-5" />
                Your Profile
              </button>
              <button
                onClick={() => {
                  navigate("/favorites");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                <IoHeartOutline className="mr-3 h-5 w-5" />
                <div className="flex items-center justify-between flex-1">
                  <span>Favorite Items</span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {favorites.tests.length + favorites.packages.length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  // TODO: Navigate to settings page when implemented
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                <IoSettingsOutline className="mr-3 h-5 w-5" />
                Settings
              </button>
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                <IoLogOutOutline className="mr-3 h-5 w-5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      <Checkout isOpen={isCheckoutOpen} onClose={closeCheckout} />
    </nav>
  );
};

export default Navbar;
