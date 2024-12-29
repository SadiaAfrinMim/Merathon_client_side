import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authprovider/AuthProvider';
import { Toggle } from './Darkmode/Darkmode';

const Navbar = () => {
  const { user, logOut, isDark, setIsDark } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    Swal.fire({
      title: 'Log in',
      text: 'Are you sure you want to log in?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, log in',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
      }
    });
  };

  const handleRegister = () => {
    Swal.fire({
      title: 'Register',
      text: 'Are you sure you want to register?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, register',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/register');
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Log out',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire('Logged out', 'You have been logged out successfully.', 'success');
      }
    });
  };

  return (
    <div className="navbar w-full mx-auto sticky top-0 left-0 right-0 z-50 bg-base-100">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link to="/" className="font-bold whitespace-nowrap text-2xl">
         RunWay
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]'
                  : 'border-b-2 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/marathons"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]'
                  : 'border-b-2 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none'
              }
            >
              Marathons
            </NavLink>
          </li>
          {user && (
           <>

<li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-gradient-to-r rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]'
                    : 'border-b-2 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none'
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Add-Marathons"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-gradient-to-r rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]'
                    : 'border-b-2 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none'
                }
              >
                Add Marathons 
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/My-Marathons"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-gradient-to-r rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]'
                    : 'border-b-2 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none'
                }
              >
               My Marathons
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/My-list"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-gradient-to-r rounded-none font-bold text-white px-6 mx-4 py-2 from-[#FF851B] to-[#FFDC00]'
                    : 'border-b-2 shadow-lg bg-orange-100 mx-4 px-6 py-2 border-[#FF851B] rounded-none'
                }
              >
               My list
              </NavLink>
            </li>

           </>
            
          )}
        </ul>
      </div>

      {/* Right: User Actions */}
      <div className="navbar-end gap-2 justify-end flex items-center sm:flex-row">
        {/* Dark Mode Toggle */}
        <div>
          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        </div>

        {/* Before Login */}
        {!user ? (
          <>
            <button
              className="p-2 bg-blue-600 text-white rounded-none"
              onClick={handleLogin}
            >
              Log in
            </button>
            <button
              className="p-2 bg-orange-500 text-white rounded-none"
              onClick={handleRegister}
            >
              Register
            </button>
          </>
        ) : (
          /* After Login */
          <div className="flex items-center space-x-2">
            {/* User Avatar */}
            <div className="relative group">
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="absolute whitespace-nowrap w-full text-center bg-gray-800 text-white rounded-lg mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {user.displayName || 'User'}
              </div>
            </div>
            {/* Log out Button */}
            <button
              className="btn btn-error text-white btn-sm rounded-none"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
