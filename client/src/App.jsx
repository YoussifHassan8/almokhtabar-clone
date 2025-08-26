import { AuthProvider, useAuth } from './contexts/AuthContext';
import GoogleSignIn from './components/GoogleSignIn';
import UserProfile from './components/UserProfile';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to AlMokhtabar
          </h1>
          <p className="text-gray-600">
            Sign in with your Google account to get started
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {user ? (
            <div>
              <UserProfile />
              <div className="mt-6 text-center">
                <p className="text-green-600 font-medium">
                  ✅ Successfully signed in!
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">
                  Choose your preferred sign-in method
                </p>
              </div>
              
              <GoogleSignIn />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  By signing in, you agree to our terms of service and privacy policy.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
