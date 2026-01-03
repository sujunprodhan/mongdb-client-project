import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaApple } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthProvider/Authprovider';
import { GoogleAuthProvider, updateProfile } from 'firebase/auth';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createEmailAndPass, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const GoogleProvider = new GoogleAuthProvider();

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value || '';
    const email = e.target.email.value || '';
    const password = e.target.password.value || '';
    const photo = e.target.photo.value || '';

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error('Password must be 6+ chars with uppercase, lowercase, number & special char.');
      return;
    }

    createEmailAndPass(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, { displayName: name, photoURL: photo })
          .then(() => {
            toast.success('Registered successfully! 🎉');
            e.target.reset();
            navigate('/loginpage');
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
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
          .then(() => navigate('/'))
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br p-10 from-pink-600 via-purple-700 to-pink-800">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600 rounded-full blur-3xl opacity-60" />
      </div>
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 sm:p-12">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black text-white mb-3">Create Account</h1>
            <p className="text-pink-200 text-lg">Join us today!</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-6 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-pink-200 text-lg focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:bg-white/20 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full px-6 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-pink-200 text-lg focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:bg-white/20 transition"
            />

            <input
              type="url"
              name="photo"
              placeholder="Photo URL (optional)"
              className="w-full px-6 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-pink-200 text-lg focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:bg-white/20 transition"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                required
                className="w-full px-6 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-pink-200 text-lg pr-16 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:bg-white/20 transition"
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
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-pink-500/50 transform hover:scale-105 hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            >
              Register Now
            </button>
          </form>

          <div className="my-10 flex items-center">
            <div className="flex-1 h-px bg-white/30" />
            <span className="px-6 text-pink-200 font-medium">or sign up with</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <button
              onClick={handleGoogleRegister}
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

          <p className="text-center mt-10 text-pink-200 text-sm">
            Already have an account?{' '}
            <Link to="/loginpage" className="font-bold text-white hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
