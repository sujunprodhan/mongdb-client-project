import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/Authprovider';
import { toast } from 'react-toastify';

const Reset = () => {
  const { forgetPassword } = useContext(AuthContext);

  const handleForget = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    forgetPassword(email)
      .then(() => {
        toast.success('Password reset email sent!');
        window.open('https://gmail.com', '_blank');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#F1369620] rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 11v6a2 2 0 002 2h10a2 2 0 002-2v-6"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>
        </div>

        <form onSubmit={handleForget} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F13696]"
          />
          <button
            type="submit"
            className="w-full mt-5 py-2 rounded-lg bg-[#F13696] text-white font-semibold hover:bg-[#d12d7f] transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          Remembered your password?{' '}
          <a className="text-[#F13696] hover:underline" href="/loginpage">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Reset;
