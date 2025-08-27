import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import WelcomeHeader from "../components/WelcomeHeader";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import GoogleSignIn from "../components/GoogleSignIn";

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin"); // "signin" or "signup"

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6 border-t-4 border-red-600">
            <WelcomeHeader />

            {/* Tab switcher */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setMode("signin")}
                className={`px-4 py-2 font-medium ${
                  mode === "signin"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`px-4 py-2 font-medium ${
                  mode === "signup"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            {mode === "signin" ? <SignInForm /> : <SignUpForm />}

            {/* Divider */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
