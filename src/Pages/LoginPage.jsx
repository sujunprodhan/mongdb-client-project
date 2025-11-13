import React, { useState, useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthProvider/Authprovider';
import { GoogleAuthProvider } from 'firebase/auth';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const { signInWithPass, signInWithGoogle, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithPass(email, password)
      .then(() => {
        toast.success('Login Successful!');
        navigate('/profile');
        e.target.reset();
        setEmailValue('');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle(googleProvider)
      .then((result) => {
        const newUser = {
          name: result.user?.displayName || '',
          email: result.user?.email || '',
          image: result.user?.photoURL || '',
        };

        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
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
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handlePasswordReset = async () => {
    const email = emailValue?.trim();
    if (!email) {
      toast.error('Please enter your email in the email field first.');
      return;
    }

    try {
      await resetPassword(email);
      toast.success('Password reset email sent. Please check your inbox.');
      try {
        window.open('https://mail.google.com', '_blank');
      } catch {}
    } catch (error) {
      toast.error(error.message || 'Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">Login Here</h1>

          <form onSubmit={handleLogIn} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-pink-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <p className="text-sm text-center text-gray-500 mt-4">
                Forgot your password?{' '}
                <button
                  onClick={handlePasswordReset}
                  className="underline text-pink-600 font-semibold"
                >
                  Reset here
                </button>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition duration-200"
            >
              Login Now
            </button>
          </form>

          <div className="my-5 flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm text-gray-400">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition duration-200"
          >
            <FcGoogle size={22} />
            <span>Login with Google</span>
          </button>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{' '}
            <Link to="/registerpage" className="ml-2 font-medium text-pink-600">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
