import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/NavBar";

const landing = () => {
  const { user } = useAuth();

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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Test Results
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div>
                    <h3 className="font-medium text-blue-800">Blood Test</h3>
                    <p className="text-sm text-blue-600">
                      Completed: Aug 25, 2023
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition duration-200">
                    View Results
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div>
                    <h3 className="font-medium text-green-800">
                      Vitamin D Test
                    </h3>
                    <p className="text-sm text-green-600">
                      Completed: Aug 20, 2023
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm transition duration-200">
                    View Results
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-red-50 hover:bg-red-100 rounded-lg transition duration-200">
                  <span className="text-red-700 font-medium">
                    Schedule Appointment
                  </span>
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition duration-200">
                  <span className="text-purple-700 font-medium">
                    Request Results
                  </span>
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition duration-200">
                  <span className="text-blue-700 font-medium">
                    Medical History
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Upcoming Appointments
              </h3>
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <p className="text-yellow-800 font-medium">September 2, 2023</p>
                <p className="text-sm text-yellow-600">10:30 AM - Blood Test</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default landing;
