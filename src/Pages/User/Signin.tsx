import { YoutubeIcon } from 'lucide-react';
import React from 'react';

type Props = {};

const Signin = (props: Props) => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-300">
      <div className="bg-white p-8 rounded-md shadow-md w-[360px]">
        <div className="text-center mb-6">
          <YoutubeIcon className="text-red-600 mx-auto mb-2" size={48} />
          <h1 className="text-2xl font-semibold text-gray-700">Sign in</h1>
          <p className="text-gray-500 text-sm">to continue to YouTube</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email or username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between items-center text-sm">
            <span>
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </span>
          </div>

          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 text-blue-600 hover:underline">
              <a href="/signup">Create account</a>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
