import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../AuthProvider/Authprovider';
import { toast } from 'react-toastify';
import logo from '../assets/logo.svg';

const NavBar = () => {
  const { user, handleSignOut } = useContext(AuthContext);

  const handlesignOutUser = () => {
    handleSignOut()
      .then(() => {
        toast.success('Sign Out Successfully');
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const activeClass = ({ isActive }) =>
    isActive ? 'text-pink-600 font-semibold' : 'text-black text-xl';

  const links = (
    <>
      <li>
        <NavLink to="/" className={activeClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allpropertise" className={activeClass}>
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink to="/addpropertise" className={activeClass}>
          Add Property
        </NavLink>
      </li>
      <li>
        <NavLink to="/mypropertise" className={activeClass}>
          My Property
        </NavLink>
      </li>
      <li>
        <NavLink to="/myrating" className={activeClass}>
          My Rating
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Mobile Dropdown */}
          <div className="flex items-center gap-6">
            {/* Mobile Dropdown */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost p-2" aria-label="Open menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-3 shadow-lg bg-white rounded-lg w-56"
              >
                {links}

                <div className="mt-3 border-t pt-3 flex flex-col items-center gap-3">
                  {user ? (
                    <>
                      {/* ✅ User photo + name visible on mobile */}
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="h-[45px] w-[45px] rounded-full object-cover border-2 border-pink-500"
                      />
                      <span className="text-gray-700 font-medium text-center">
                        {user.displayName || 'User'}
                      </span>
                      <button
                        onClick={handlesignOutUser}
                        className="px-4 py-2 rounded-full font-medium bg-red-100 text-red-600 hover:bg-red-200 transition"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/loginpage"
                        className="px-6 py-2 text-center rounded-full font-semibold bg-gradient-to-r from-pink-600 to-pink-500 text-white hover:opacity-95 transition duration-200 shadow-lg w-full"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/registerpage"
                        className="px-5 py-1 text-center rounded-full font-semibold border-2 border-pink-600 text-pink-500 hover:bg-red-50 transition duration-200 shadow-md w-full"
                      >
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              </ul>
            </div>

            {/* Logo */}
            <NavLink
              to="/"
              className="text-2xl font-bold text-pink-600 hover:text-pink-500 transition duration-200"
            >
              <img src={logo} alt="Logo" className="bg-pink-600 px-5 py-1 rounded-md" />
            </NavLink>
          </div>

          {/* Center: Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <ul className="menu menu-horizontal px-1 gap-6 text-gray-700 ">{links}</ul>
          </div>

          {/* Right: Desktop Login/User */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div>
                  <button popoverTarget="popover-1" style={{ anchorName: '--anchor-1' }}>
                    <img
                      src={user.photoURL}
                      className="h-[40px] w-[40px] rounded-full"
                      alt="User"
                    />
                  </button>
                  <ul
                    className="dropdown menu w-50 rounded-md bg-base-100 shadow-sm"
                    popover="auto"
                    id="popover-1"
                    style={{ positionAnchor: '--anchor-1' }}
                  >
                    <li>
                      <span className="text-gray-700">{user?.displayName}</span>
                    </li>
                    <li>
                      <span className="text-gray-700">{user?.email}</span>
                    </li>
                    <button
                      onClick={handlesignOutUser}
                      className="px-4 py-2 rounded-full font-medium bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      Log Out
                    </button>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <NavLink
                  to="/loginpage"
                  className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-600 to-pink-500 text-white hover:opacity-95 transition duration-200 shadow-lg"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/registerpage"
                  className="px-5 py-1 rounded-full font-semibold border-2 border-pink-600 text-pink-500 hover:bg-red-50 transition duration-200 shadow-md"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
