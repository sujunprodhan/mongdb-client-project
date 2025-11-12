import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../AuthProvider/Authprovider';
import { toast } from 'react-toastify';

const NavBar = () => {
  const { user, handleSignOut } = useContext(AuthContext);

  const handlesignOutUser = () => {
    handleSignOut()
      .then((res) => {
        console.log(res);
        toast.success('Sign Out Successfully');
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const activeClass = ({ isActive }) => (isActive ? 'text-pink-600 ' : 'text-black tex-xl');

  const links = (
    <>
      <li>
        <NavLink to="/" className={activeClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allpropertise" className={activeClass}>
          ALL Propertise
        </NavLink>
      </li>
      <li>
        <NavLink to="/addpropertise" className={activeClass}>
          Add Propertise
        </NavLink>
      </li>
      <li>
        <NavLink to="/mypropertise" className={activeClass}>
          My Propertise
        </NavLink>
      </li>
      <li>
        <NavLink to="/myratings" className={activeClass}>
          My Ratings
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: brand + mobile menu */}
          <div className="flex items-center gap-6">
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-3 shadow-lg bg-white rounded-lg w-52"
              >
                {links}
              </ul>
            </div>

            <NavLink
              to="/"
              className="text-2xl font-bold text-pink-600 hover:text-pink-500ition duration-200"
            >
              MyBrand
            </NavLink>
          </div>

          {/* Center: desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <ul className="menu menu-horizontal px-1 gap-6 text-gray-700 ">{links}</ul>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div>
                  {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
                  {/* For TSX uncomment the commented types below */}
                  <button
                    popoverTarget="popover-1"
                    style={{ anchorName: '--anchor-1' } /* as React.CSSProperties */}
                  >
                    <img src={user.photoURL} className="h-[40px] w-[40px] rounded-full" alt="" />
                  </button>

                  <ul
                    className="dropdown menu w-50 rounded-md bg-base-100 shadow-sm"
                    popover="auto"
                    id="popover-1"
                    style={{ positionAnchor: '--anchor-1' } /* as React.CSSProperties */}
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
              <div className="flex items-center gap-3">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
