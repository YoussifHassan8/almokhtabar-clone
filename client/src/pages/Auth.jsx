import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import GoogleSignIn from "../components/GoogleSignIn";
import UserProfile from "../components/UserProfile";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import WelcomeHeader from "../components/WelcomeHeader";
function Auth() {
  const { user, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {user ? (
            <div className="animate-fade-in">
              <UserProfile />
              <div className="mt-6 text-center">
                <p className="text-green-600 font-medium">
                  ✅ Successfully signed in!
                </p>
              </div>
            </div>
          ) : (
            <>
              <WelcomeHeader />
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="p-1 bg-gradient-to-r from-red-500 to-red-700"></div>

                <div className="px-8 py-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {isSignUp ? "Create Account" : "Sign In"}
                    </h2>
                    <p className="text-gray-600">
                      {isSignUp
                        ? "Create an account to get started"
                        : "Access your medical results and reports"}
                    </p>
                  </div>

                  {isSignUp ? <SignUpForm /> : <SignInForm />}

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <GoogleSignIn />

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      {isSignUp
                        ? "Already have an account? "
                        : "Don't have an account? "}
                      <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="cursor-pointer font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
                      >
                        {isSignUp ? "Sign in" : "Sign up"}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
