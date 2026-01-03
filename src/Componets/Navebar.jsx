import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../AuthProvider/Authprovider';
import { toast } from 'react-toastify';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo.svg';

const NavBar = () => {
  const activeClass = ({ isActive }) =>
    isActive
      ? 'text-pink-600 font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-pink-600 after:to-pink-600 after:rounded-full'
      : 'text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 transition-colors duration-200';

  const { user, handleSignOut } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Theme setup
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
    setUserMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto bg-pink-600 p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={activeClass}>
              Home
            </NavLink>
            <NavLink to="/allpropertise" className={activeClass}>
              All Properties
            </NavLink>
            <NavLink to="/about" className={activeClass}>
              About
            </NavLink>

            {user && (
              <>
                <NavLink to="/addpropertise" className={activeClass}>
                  Add Property
                </NavLink>
                <NavLink to="/mypropertise" className={activeClass}>
                  My Property
                </NavLink>
                <NavLink to="/myrating" className={activeClass}>
                  My Rating
                </NavLink>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeChange}
              className="p-2.5 rounded-full bg-gray-200/50 dark:bg-gray-700/50 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors duration-200"
            >
              {isDark ? (
                <FiSun className="w-5 h-5 text-pink-600" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/*  Auth Buttons */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <img
                  src={user.photoURL || '/default-avatar.png'}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-pink-300 hover:ring-pink-500 transition-all duration-300"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                />
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      
                      <p className="text-xs text-center text-pink-600 font-medium truncate">{user.email}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      
                        <NavLink
                          to="/dashboard"
                          className="w-full px-4 py-3 text-sm font-medium hover:text-white hover:bg-pink-500  transition-colors text-center border-b border-pink-300"
                        >
                          Dashboard
                        </NavLink>
                    

                      <button
                        onClick={handleSignOutUser}
                        className="w-full text-center px-4 py-3 text-sm font-medium text-pink-600 hover:text-white hover:bg-pink-600 duration-300 transition "
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <NavLink
                  to="/loginpage"
                  className="px-6 py-2.5 border-2 border-pink-600 text-pink-600 font-semibold rounded-xl hover:bg-pink-600 hover:text-white transition-all duration-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/registerpage"
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Register
                </NavLink>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-200/50 dark:bg-gray-700/50"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-4">
              <NavLink to="/" className={activeClass} onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink
                to="/allpropertise"
                className={activeClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                All Properties
              </NavLink>
              <NavLink
                to="/dashboard"
                className={activeClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/addpropertise"
                    className={activeClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Add Property
                  </NavLink>
                  <NavLink
                    to="/mypropertise"
                    className={activeClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Property
                  </NavLink>
                  <NavLink
                    to="/myrating"
                    className={activeClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Rating
                  </NavLink>
                </>
              )}
              {!user && (
                <div className="flex flex-col gap-3 pt-4">
                  <NavLink
                    to="/loginpage"
                    className="px-6 py-3 text-center border-2 border-pink-600 text-pink-600 font-semibold rounded-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/registerpage"
                    className="px-6 py-3 text-center bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
