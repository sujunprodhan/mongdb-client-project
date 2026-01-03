import React, { useState, useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaApple } from 'react-icons/fa';
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
      .catch((error) => toast.error(error.message));
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle(googleProvider)
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
          .then(() => navigate('/'))
          .catch((err) => toast.error(err.message));
      })
      .catch((error) => toast.error(error.message));
  };

  const handlePasswordReset = async () => {
    const email = emailValue?.trim();
    if (!email) return toast.error('Please enter your email first.');
    try {
      await resetPassword(email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-screen flex p-10 items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-pink-700">
      {/* Floating blur orbs - Dribbble style particles */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-40 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-600 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="backdrop-blur-2xl bg-white/15 border border-white/20 rounded-3xl shadow-2xl p-10 sm:p-12">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black text-white mb-3">Sign In</h1>
            <p className="text-pink-100 text-lg">Welcome back to your account</p>
          </div>

          <form onSubmit={handleLogIn} className="space-y-7">
            <input
              type="email"
              name="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-6 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-pink-200 text-lg focus:outline-none focus:ring-4 focus:ring-pink-300/50 focus:bg-white/20 transition"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-6 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-pink-200 text-lg pr-16 focus:outline-none focus:ring-4 focus:ring-pink-300/50 focus:bg-white/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-pink-200 hover:text-white text-2xl"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button
              type="button"
              onClick={handlePasswordReset}
              className="text-pink-200 hover:text-white text-sm font-medium underline-offset-4 hover:underline transition"
            >
              Forgot password?
            </button>

            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-pink-500/60 transform hover:scale-105 hover:from-pink-600 hover:to-pink-700 transition-all duration-300"
            >
              Log In
            </button>
          </form>

          <div className="my-10 flex items-center">
            <div className="flex-1 h-px bg-white/30" />
            <span className="px-6 text-pink-200 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <button
              onClick={handleGoogleSignIn}
              className="py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center gap-4 hover:bg-white/20 transition"
            >
              <FcGoogle size={28} />
              <span className="text-white font-semibold">Google</span>
            </button>
            <button className="py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center gap-4 hover:bg-white/20 transition">
              <FaApple size={32} className="text-white" />
              <span className="text-white font-semibold">Apple</span>
            </button>
          </div>

          <p className="text-center mt-10 text-pink-200">
            New here?{' '}
            <Link to="/registerpage" className="font-bold text-white hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
