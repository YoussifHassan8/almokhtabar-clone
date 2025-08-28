// pages/Dashboard.js
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/NavBar";
import QuickStatsChart from "../components/QuickStatsChart";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

const Landing = () => {
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    openCheckout,
  } = useCart();
  const [activeTab, setActiveTab] = useState("tests");

  // Mock data for tests and packages
  const tests = [
    {
      id: 1,
      name: "Complete Blood Count",
      price: 50,
      description: "Measures the components of blood",
    },
    {
      id: 2,
      name: "Diabetes Test",
      price: 30,
      description: "Measures blood sugar levels",
    },
    {
      id: 3,
      name: "Thyroid Test",
      price: 45,
      description: "Evaluates thyroid function",
    },
    {
      id: 4,
      name: "Vitamin D Test",
      price: 65,
      description: "Measures vitamin D levels",
    },
  ];

  const packages = [
    {
      id: 101,
      name: "Basic Health Package",
      price: 100,
      description: "Includes Complete Blood Count and Diabetes Test",
      tests: [1, 2],
    },
    {
      id: 102,
      name: "Comprehensive Health Package",
      price: 180,
      description: "Includes all basic tests plus Thyroid and Vitamin D",
      tests: [1, 2, 3, 4],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 p-6 border-t-4 border-red-600 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's your latest activity and results at AlMokhtabar Laboratory
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Available Tests & Packages
                </h2>
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab("tests")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition duration-200 ${
                      activeTab === "tests"
                        ? "bg-white text-red-600 shadow-sm"
                        : "text-gray-600 hover:text-red-600"
                    }`}
                  >
                    Individual Tests
                  </button>
                  <button
                    onClick={() => setActiveTab("packages")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition duration-200 ${
                      activeTab === "packages"
                        ? "bg-white text-red-600 shadow-sm"
                        : "text-gray-600 hover:text-red-600"
                    }`}
                  >
                    Packages
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {activeTab === "tests" ? (
                  <>
                    {tests.map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition duration-200"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {test.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {test.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-red-600 font-bold">
                            ${test.price}
                          </span>
                          <button
                            onClick={() => toggleFavorite(test, "tests")}
                            className={`p-2 rounded-md transition duration-200 ${
                              isFavorite(test.id, "tests")
                                ? "text-red-600 bg-red-50"
                                : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                            }`}
                            title={
                              isFavorite(test.id, "tests")
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                          >
                            <div className="relative w-5 h-5">
                              <GoHeart
                                className={`absolute inset-0 transition-opacity duration-100 ${
                                  isFavorite(test.id, "tests")
                                    ? "opacity-0"
                                    : "opacity-100"
                                }`}
                              />
                              <GoHeartFill
                                className={`absolute inset-0 transition-opacity duration-100 ${
                                  isFavorite(test.id, "tests")
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                            </div>
                          </button>
                          <button
                            onClick={() => addToCart(test, "tests")}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition duration-200 transform hover:-translate-y-0.5"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition duration-200"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {pkg.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {pkg.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-red-600 font-bold">
                            ${pkg.price}
                          </span>
                          <button
                            onClick={() => toggleFavorite(pkg, "packages")}
                            className={`p-2 rounded-md transition duration-200 ${
                              isFavorite(pkg.id, "packages")
                                ? "text-red-600 bg-red-50"
                                : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                            }`}
                            title={
                              isFavorite(pkg.id, "packages")
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                          >
                            <div className="relative w-5 h-5">
                              <GoHeart
                                className={`absolute inset-0 transition-opacity duration-100 ${
                                  isFavorite(pkg.id, "packages")
                                    ? "opacity-0"
                                    : "opacity-100"
                                }`}
                              />
                              <GoHeartFill
                                className={`absolute inset-0 transition-opacity duration-100 ${
                                  isFavorite(pkg.id, "packages")
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                            </div>
                          </button>
                          <button
                            onClick={() => addToCart(pkg, "packages")}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition duration-200 transform hover:-translate-y-0.5"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <QuickStatsChart />

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your Cart
              </h3>
              {cartItems.length === 0 ? (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-center text-gray-500">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          ${item.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.type,
                              item.quantity - 1
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-200"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.type,
                              item.quantity + 1
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-200"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.type)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition duration-200"
                          title="Remove item"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Total: ${getCartTotal().toFixed(2)}
                </span>
                <button
                  onClick={openCheckout}
                  disabled={cartItems.length === 0}
                  className={`px-4 py-2 rounded-md text-sm transition duration-200 ${
                    cartItems.length === 0
                      ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
