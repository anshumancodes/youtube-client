import { YoutubeIcon, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/AllExportWrapper";

type Props = {};

const Signin: React.FC<Props> = () => {
  const { setUser } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage("Email and password are required.");
      setSuccessMessage("");
    } else {
      setErrorMessage(""); // Clear error if inputs are valid
      axios
        .post(`${API_ENDPOINT}/api/v0/user/login`, {
          username,
          password,
        })
        .then((response) => {
          console.log(response.data.data.user);
          // localStorage.setItem("USER",response.data.data.user)
          // set to local storage.
          // set user from local storage as global variable 
          // then acess the user info
          setSuccessMessage("Login successful! Redirecting...");
          // You might want to add a redirect here after a short delay
          setTimeout(() => { window.location.href = "/"; }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Login failed. Please check your credentials.");
          setSuccessMessage("");
        });
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
              <a
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
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
