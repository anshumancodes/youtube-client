import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle,Youtube } from "lucide-react";
import { useAuth } from "../../context/AuthContextProvider";


const Signin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Email and password are required.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 3000);
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="bg-[#fff] px-[24px] py-[40px] text-[#212121] flex rounded-3xl flex-col w-[400px]">
        <div className="flex flex-col items-center justify-center mb-6">
         
          <h1 className="text-3xl font-semibold text-gray-700">Sign in</h1>
          <p className="text-gray-500 text-base font-normal mt-2">to continue to YouTube-client</p>
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded relative" role="alert">
            <div className="flex items-center">
              <CheckCircle className="mr-2" size={20} />
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email or username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex flex-col gap-2">
          <button
              type="submit"
              className="px-4 py-2 bg-[#212121] text-white rounded-md w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            <Link to={"/forgot-password"}><p className="text-[#4285F4] text-sm underline mt-2">forgot password ?</p></Link>
          </div>
          <div className="flex gap-2 font-medium"><p>Dont have a account?</p><a href="/register" className="text-[#4285F4] text-base font-normal">Sign up Now</a></div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
