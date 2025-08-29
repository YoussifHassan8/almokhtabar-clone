import { useState } from "react";
import { GoLocation } from "react-icons/go";
import Navbar from "../components/NavBar";
const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the API base URL from environment variables or use a default
  const API_BASE_URL = "http://localhost:5000";

  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`${API_BASE_URL}/api/branches`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
          });

          if (!response.ok) throw new Error("Network response failed");

          const data = await response.json();
          setBranches(
            Array.isArray(data.data.branches[0]) ? data.data.branches[0] : []
          );
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border-l-4 border-red-600">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Nearby Branches
          </h1>
          <p className="mt-2 text-gray-600">
            Share your location to discover the nearest AlMokhtabar branches
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Branch Locator
                </h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <GoLocation className="w-8 h-8 text-red-600" />
                  </div>
                  <p className="text-gray-600 mb-6 text-center">
                    To find the nearest branches, we need your permission to
                    access your location.
                  </p>
                  <button
                    onClick={handleLocateUser}
                    disabled={isLoading}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition duration-200 shadow-md hover:shadow-lg ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Locating...
                      </span>
                    ) : (
                      "Share My Location"
                    )}
                  </button>

                  {error && (
                    <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
                      <p>Error: {error}</p>
                    </div>
                  )}
                </div>

                {branches.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Nearby Branches
                    </h3>
                    <div className="space-y-4">
                      {branches.map((branch) => (
                        <div
                          key={branch.branchId}
                          className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {branch.branchNameEnglish}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {branch.branchAddress}
                              </p>

                              <div className="flex items-center mt-3 text-sm text-gray-500">
                                <span className="mr-4">
                                  Tel: {branch.branchTel}
                                </span>
                                {branch.branchFax && (
                                  <span>Fax: {branch.branchFax}</span>
                                )}
                              </div>

                              {branch.branchCallCenterComment && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-xs text-gray-600">
                                    {branch.branchCallCenterComment}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <GoLocation className="w-4 h-4 mr-1 text-red-600" />
                              <span>{branch.distance || "Nearby"}</span>
                            </div>
                            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition duration-200 shadow-md hover:shadow-lg">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Branch Services
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-bold">✓</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Sample Collection
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Professional blood and sample collection
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-bold">✓</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Home Visits
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Schedule a specialist to visit your home
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-bold">✓</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Quick Results
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Get results electronically within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    All our branches follow strict quality control measures and
                    are staffed by certified professionals.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Need Help?
                </h3>
              </div>
              <div className="p-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">
                    Call Center: 19014
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Available 24/7 for assistance
                  </p>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition duration-200">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branches;
