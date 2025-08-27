import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/NavBar";

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("tests");

  const handleRemoveFromFavorites = (itemId, type) => {
    removeFromFavorites(itemId, type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 p-6 border-t-4 border-red-600 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Favorite Items
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your saved tests and packages for quick access
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6">
          {/* Tab Navigation */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Favorites
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
                Tests ({favorites.tests.length})
              </button>
              <button
                onClick={() => setActiveTab("packages")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition duration-200 ${
                  activeTab === "packages"
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Packages ({favorites.packages.length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {activeTab === "tests" ? (
              <>
                {favorites.tests.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No favorite tests
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Start adding tests to your favorites to see them here.
                    </p>
                  </div>
                ) : (
                  favorites.tests.map((test) => (
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
                          onClick={() => addToCart(test, "tests")}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition duration-200 transform hover:-translate-y-0.5"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleRemoveFromFavorites(test.id, "tests")}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition duration-200"
                          title="Remove from favorites"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            ) : (
              <>
                {favorites.packages.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No favorite packages
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Start adding packages to your favorites to see them here.
                    </p>
                  </div>
                ) : (
                  favorites.packages.map((pkg) => (
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
                          onClick={() => addToCart(pkg, "packages")}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition duration-200 transform hover:-translate-y-0.5"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleRemoveFromFavorites(pkg.id, "packages")}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition duration-200"
                          title="Remove from favorites"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
