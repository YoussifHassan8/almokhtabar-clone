// pages/Dashboard.js
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/NavBar";
import QuickStatsChart from "../components/QuickStatsChart";
import {
  GoHeart,
  GoHeartFill,
  GoChevronLeft,
  GoChevronRight,
} from "react-icons/go";

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
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock data for tests and packages
  const tests = [
    {
      id: 1,
      name: "Complete Blood Count",
      price: 50,
      description: "Measures the components of blood",
      category: "Blood Tests",
    },
    {
      id: 2,
      name: "Diabetes Test",
      price: 30,
      description: "Measures blood sugar levels",
      category: "Metabolic Panel",
    },
    {
      id: 3,
      name: "Thyroid Test",
      price: 45,
      description: "Evaluates thyroid function",
      category: "Hormone Tests",
    },
    {
      id: 4,
      name: "Vitamin D Test",
      price: 65,
      description: "Measures vitamin D levels",
      category: "Vitamin Tests",
    },
    {
      id: 5,
      name: "Liver Function Test",
      price: 55,
      description: "Assesses liver health and function",
      category: "Organ Function",
    },
    {
      id: 6,
      name: "COVID-19 Antibody Test",
      price: 75,
      description: "Detects COVID-19 antibodies",
      category: "Immunity Tests",
    },
  ];

  const packages = [
    {
      id: 101,
      name: "Basic Health Package",
      price: 100,
      description: "Includes Complete Blood Count and Diabetes Test",
      tests: [1, 2],
      popular: true,
    },
    {
      id: 102,
      name: "Comprehensive Health Package",
      price: 180,
      description: "Includes all basic tests plus Thyroid and Vitamin D",
      tests: [1, 2, 3, 4],
      popular: false,
    },
    {
      id: 103,
      name: "Executive Health Package",
      price: 250,
      description: "Complete health assessment with advanced screening",
      tests: [1, 2, 3, 4, 5, 6],
      popular: true,
    },
  ];

  // Promotional carousel data
  const carouselItems = [
    {
      id: 1,
      title: "Free Home Sample Collection",
      description: "We collect samples from your home at no extra cost",
      cta: "Book Now",
      bgClass: "bg-gradient-to-r from-red-500 to-red-700",
    },
    {
      id: 2,
      title: "Get 20% Off on Your First Order",
      description: "Use code FIRST20 at checkout",
      cta: "Shop Now",
      bgClass: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    {
      id: 3,
      title: "Results Within 24 Hours",
      description: "Fast and accurate test results delivered to your inbox",
      cta: "Learn More",
      bgClass: "bg-gradient-to-r from-green-500 to-green-700",
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border-l-4 border-red-600">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's your latest activity and results at AlMokhtabar Laboratory
          </p>
        </div>

        {/* Promotional Carousel */}
        <div className="relative h-56 mb-8 rounded-2xl overflow-hidden shadow-lg">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                item.bgClass
              } ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
              <div className="flex items-center justify-center h-full px-8">
                <div className="text-center text-white">
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <p className="mb-4">{item.description}</p>
                  <button className="px-6 py-2 bg-white text-gray-800 font-medium rounded-full hover:bg-gray-100 transition-colors">
                    {item.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <GoChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <GoChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex items-center justify-center space-x-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex justify-between items-center px-6 py-4">
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
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeTab === "tests" ? (
                    <>
                      {tests.map((test) => (
                        <div
                          key={test.id}
                          className="border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 p-5"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                {test.category}
                              </span>
                              <h3 className="font-semibold text-gray-900 mt-2">
                                {test.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {test.description}
                              </p>
                            </div>
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
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-red-600 font-bold text-lg">
                              ${test.price}
                            </span>
                            <button
                              onClick={() => addToCart(test, "tests")}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition duration-200 shadow-md hover:shadow-lg"
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
                          className={`border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 p-5 ${
                            pkg.popular ? "ring-2 ring-red-500" : ""
                          }`}
                        >
                          {pkg.popular && (
                            <div className="flex justify-end mb-2">
                              <span className="text-xs font-medium text-white bg-red-500 px-2 py-1 rounded-full">
                                Most Popular
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {pkg.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {pkg.description}
                              </p>
                              <div className="flex items-center mt-3 text-xs text-gray-500">
                                <span>Includes {pkg.tests.length} tests</span>
                              </div>
                            </div>
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
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div>
                              <span className="text-red-600 font-bold text-lg">
                                ${pkg.price}
                              </span>
                              <span className="text-xs text-gray-500 ml-1">
                                (Save $
                                {tests
                                  .filter((t) => pkg.tests.includes(t.id))
                                  .reduce((sum, test) => sum + test.price, 0) -
                                  pkg.price}
                                )
                              </span>
                            </div>
                            <button
                              onClick={() => addToCart(pkg, "packages")}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition duration-200 shadow-md hover:shadow-lg"
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
          </div>

          <div className="space-y-6">
            <QuickStatsChart />

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Your Cart</h3>
              </div>
              <div className="p-6">
                {cartItems.length === 0 ? (
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Add tests or packages to continue
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
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
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-gray-700 font-bold">
                    Total: ${getCartTotal().toFixed(2)}
                  </span>
                  <button
                    onClick={openCheckout}
                    disabled={cartItems.length === 0}
                    className={`px-4 py-2 rounded-lg text-sm transition duration-200 ${
                      cartItems.length === 0
                        ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg"
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
    </div>
  );
};

export default Landing;
