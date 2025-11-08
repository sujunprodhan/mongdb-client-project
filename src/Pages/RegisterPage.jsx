import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/Authprovider';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { createEmailAndPass } = useContext(AuthContext);

  // Signup form
  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target?.name?.value;
    const email = e.target?.email?.value;
    const password = e.target?.password?.value;

    console.log({ name });

    createEmailAndPass(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('Register Successfully');
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">Register Here</h1>

          <div className="space-y-5">
            <form onSubmit={handleSignUp}>
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  autoComplete="name"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button className="w-full mt-5 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition duration-200">
                Register Now
              </button>
            </form>

            <div className="flex items-center gap-2">
              <hr className="flex-1 border-gray-300" />
              <span className="text-sm text-gray-400">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <button className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition duration-200">
              <FcGoogle size={22} />
              <span>Register with Google</span>
            </button>

            <p className="text-xs text-center text-gray-500">
              By registering you agree to our <span className="underline">Terms</span> and{' '}
              <span className="underline">Privacy</span>.
            </p>

            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">Already have an account?</span>{' '}
              <button className="ml-2 font-medium text-pink-600">Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
