import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">Login Here</h1>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition duration-200">
              Login Now
            </button>

            <div className="flex items-center gap-2">
              <hr className="flex-1 border-gray-300" />
              <span className="text-sm text-gray-400">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <button className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition duration-200">
              <FcGoogle size={22} />
              <span>Login with Google</span>
            </button>

            <p className="text-xs text-center text-gray-500">
              Forgot your password? <span className="underline text-pink-600">Reset here</span>
            </p>

            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">Don't have an account?</span>{' '}
              <button className="ml-2 font-medium text-pink-600">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
