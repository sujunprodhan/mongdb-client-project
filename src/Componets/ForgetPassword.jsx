import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { AuthContext } from '../AuthProvider/Authprovider';

const ForgetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || '';
  const [email, setEmail] = useState(initialEmail);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await resetPassword(email);
      setEmail('');
      alert('Password reset email sent! Check your inbox.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Failed to send reset email. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-100 to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-200">
        <motion.h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Forgot Password
        </motion.h2>
        <motion.p className="text-center text-gray-600 mb-4">
          Enter your email to reset your password
        </motion.p>
        <motion.form onSubmit={handleReset} className="space-y-5">
          <motion.input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-purple-500 transition"
            required
          />
          <motion.button
            type="submit"
            className="w-full bg-pink-700 text-white py-2.5 rounded-lg font-medium hover:bg-pink-700 transition cursor-pointer"
          >
            Send Reset Email
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default ForgetPassword;
