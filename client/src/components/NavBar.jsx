// components/Navbar.js
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import Checkout from "./Checkout";
import { motion, AnimatePresence } from "framer-motion";
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

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.1 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section - Logo and hamburger menu */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-bold text-red-600 cursor-pointer"
                onClick={() => navigate("/landing")}
              >
                AlMokhtabar
              </motion.h1>
            </div>
          </div>

          {/* Right section - Navigation, cart, user menu */}
          <div className="flex items-center space-x-4">
            {/* Navigation items - visible on medium screens and up */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.name}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(item.path)}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? "text-red-600 bg-red-50 border-b-2 border-red-600"
                        : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <IconComponent className="mr-1.5 h-4 w-4" />
                    {item.name}
                  </motion.button>
                );
              })}
            </div>

            {/* Cart button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={openCheckout}
              className="relative p-2 text-gray-600 hover:text-red-600 transition duration-200 rounded-lg hover:bg-red-50"
              aria-label="Shopping cart"
            >
              <IoCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-red-500 text-xs text-white font-medium">
                    {getCartCount()}
                  </span>
                </motion.span>
              )}
            </motion.button>

            {/* User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none p-1 rounded-lg hover:bg-red-50 transition duration-200"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <motion.img
                  whileHover={{ rotate: 5 }}
                  className="h-8 w-8 rounded-full object-cover border-2 border-red-100"
                  src={user.picture}
                  alt={user.name}
                />
                <span className="text-gray-700 text-sm font-medium hidden md:block">
                  {user.name}
                </span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoChevronDown className="h-4 w-4 text-gray-500" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                  >
                    <div
                      className="py-2"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          navigate("/profile");
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                        role="menuitem"
                      >
                        <IoPersonOutline className="mr-3 h-5 w-5 text-gray-400" />
                        Your Profile
                      </motion.button>

                      <motion.button
                        whileHover={{ x: 5 }}
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
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                            className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full"
                          >
                            {favorites.tests.length + favorites.packages.length}
                          </motion.span>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          // TODO: Navigate to settings page when implemented
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition duration-150"
                        role="menuitem"
                      >
                        <IoSettingsOutline className="mr-3 h-5 w-5 text-gray-400" />
                        Settings
                      </motion.button>

                      <div className="border-t border-gray-100 my-1"></div>

                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={signOut}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition duration-150"
                        role="menuitem"
                      >
                        <IoLogOutOutline className="mr-3 h-5 w-5" />
                        Sign out
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger menu for mobile */}
            <motion.button
              data-hamburger
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-red-50 focus:outline-none"
              aria-label="Main menu"
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <IoClose className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <IoMenu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1, duration: 0.3 },
                    }}
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
                  </motion.button>
                );
              })}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ rotate: 5 }}
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover border-2 border-red-100"
                    src={user.picture}
                    alt={user.name}
                  />
                </motion.div>
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
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50"
                >
                  <IoPersonOutline className="mr-3 h-5 w-5" />
                  Your Profile
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    navigate("/favorites");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50"
                >
                  <IoHeartOutline className="mr-3 h-5 w-5" />
                  <div className="flex items-center justify-between flex-1">
                    <span>Favorite Items</span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                      className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full"
                    >
                      {favorites.tests.length + favorites.packages.length}
                    </motion.span>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    // TODO: Navigate to settings page when implemented
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50"
                >
                  <IoSettingsOutline className="mr-3 h-5 w-5" />
                  Settings
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <IoLogOutOutline className="mr-3 h-5 w-5" />
                  Sign out
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Checkout isOpen={isCheckoutOpen} onClose={closeCheckout} />
    </nav>
  );
};

export default Navbar;
