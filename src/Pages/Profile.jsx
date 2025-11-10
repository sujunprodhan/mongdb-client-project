import React, { use } from 'react';
import { AuthContext } from '../AuthProvider/Authprovider';

const Profile = () => {
  const { user } = use(AuthContext);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center border-t-4"
        style={{ borderColor: '#EF2369' }}
      >
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={user.photoURL}
            alt="profile"
            className="w-28 h-28 rounded-full border-4"
            style={{ borderColor: '#EF2369' }}
          />
        </div>

        {/* Name */}
        <h1 className="text-2xl font-semibold text-gray-800">{user.displayName}</h1>

        {/* Email */}
        <p className="text-gray-600 mt-1">{user.email}</p>

        {/* Button */}
        <button
          className="mt-5 w-full py-2 rounded-xl text-white font-semibold"
          style={{ backgroundColor: '#EF2369' }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
