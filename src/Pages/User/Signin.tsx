import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { YoutubeIcon, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContextProvider";


type Props = {};

const Signin: React.FC<Props> = () => {
  const { login } = useAuth();
  
 

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Email and password are required.");
      setSuccessMessage("");
    } else {
      setErrorMessage(""); // Clear error if inputs are valid
      try {
        const success = await login(username, password);
        if (success) {
          setSuccessMessage("Login successful! Redirecting...");
          
          setTimeout(() => {
            window.location.href="/"
           }, 3000);
        } else {
          setErrorMessage("Login failed. Please check your credentials.");
          setSuccessMessage("");
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("An error occurred during login. Please try again.");
        setSuccessMessage("");
      }
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-300">
      <div className="bg-white p-8 rounded-md shadow-md w-[360px]">
        <div className="text-center mb-6">
          <YoutubeIcon className="text-red-600 mx-auto mb-2" size={48} />
          <h1 className="text-2xl font-semibold text-gray-700">Sign in</h1>
          <p className="text-gray-500 text-sm">to continue to YouTube</p>
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded relative" role="alert">
            <div className="flex items-center">
              <CheckCircle className="mr-2" size={20} />
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email or username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex justify-between items-center text-sm">
            <span>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </span>
          </div>

          <div className="flex justify-between mt-4">
            <Link to="/register">
              <button className="px-4 py-2 text-blue-600 hover:underline">
                Create account
              </button>
            </Link>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
