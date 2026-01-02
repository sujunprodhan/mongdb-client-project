import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/Authprovider';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import { GoogleAuthProvider, updateProfile } from 'firebase/auth';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createEmailAndPass, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const GoogleProvider = new GoogleAuthProvider();

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target?.name?.value || '';
    const email = e.target?.email?.value || '';
    const password = e.target?.password?.value || '';
    const photo = e.target?.photo?.value || '';

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be at least 6 characters and include uppercase, lowercase, number and special character.'
      );
      return;
    }

    createEmailAndPass(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            toast.success('Registered successfully');
            e.target.reset();
            navigate('/loginpage');
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleGoogleRegister = () => {
    signInWithGoogle(GoogleProvider)
      .then((result) => {
        const newUser = {
          name: result.user?.displayName || '',
          email: result.user?.email || '',
          image: result.user?.photoURL || '',
        };

        fetch('https://mongodb-server-site.vercel.app/users', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate('/');
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-pink-600">
            Register Here
          </h1>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
              />
            </div>

            <div>
              <label htmlFor="photo" className="block text-sm font-medium mb-2">
                Photo URL (optional)
              </label>
              <input
                id="photo"
                name="photo"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-pink-600 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition duration-200"
            >
              Register Now
            </button>
          </form>

          <div className="my-4 flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm text-gray-400">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition duration-200"
          >
            <FcGoogle size={22} />
            <span>Sign Up with Google</span>
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            By registering you agree to our <span className="underline">Terms</span> and{' '}
            <span className="underline">Privacy</span>.
          </p>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <Link to="/loginpage" className="ml-2 font-medium text-pink-600">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
