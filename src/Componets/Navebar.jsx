import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../AuthProvider/Authprovider';
import { toast } from 'react-toastify';
import { FiSun, FiMoon } from 'react-icons/fi'; // React Icons
import logo from '../assets/logo.svg';

const NavBar = () => {
  const activeClass = ({ isActive }) =>
    isActive ? 'text-pink-600' : 'text-base-content';

  const { user, handleSignOut } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  /* ---------- Theme ---------- */
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const dark = saved === 'dark';
    setIsDark(dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, []);

  const handleThemeChange = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  /* ---------- Outside Click ---------- */
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOutUser = () => {
    handleSignOut()
      .then(() => toast.success('Sign Out Successfully'))
      .catch((e) => toast.error(e.message));
  };

  return (
    <nav className="shadow-md py-3 bg-white dark:bg-gray-800">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="bg-[#EB198B] h-10 w-40 px-3 py-1 rounded-md" />
        </div>

        {/* Nav Links */}
        <ul className="flex items-center gap-5 list-none">
          <li>
            <NavLink to="/" className={activeClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/allpropertise" className={activeClass}>
              All Properties
            </NavLink>
            <li>
              <NavLink to="/dashboard" className={activeClass}>
                Dashboard
              </NavLink>
            </li>
          </li>

          {/* show user */}
          {user && (
            <>
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
          )}
        </ul>

        {/* User / Auth Buttons + Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={handleThemeChange}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          >
            {isDark ? (
              <FiSun className="w-5 h-5 text-pink-600" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-800" />
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              />

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2 z-50">
                  <p className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{user.email}</p>
                  <button
                    onClick={handleSignOutUser}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/loginpage"
                className="border border-pink-600 text-pink-600 px-5 py-1.5 rounded-md  font-medium hover:bg-pink-600 hover:text-white transition duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/registerpage"
                className="border border-pink-600 text-white px-5 py-1.5 rounded-md font-medium bg-pink-600 hover:text-white transition duration-300"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
