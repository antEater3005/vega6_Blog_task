import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className=' bg-gray-600 text-white shadow-md w-full fixed '>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        {/* Logo */}
        <Link
          to='/'
          className='text-2xl font-bold text-gray-200 hover:text-gray-300'
        >
          Vega6 Blogs
        </Link>

        {/* Menu Items - Desktop */}
        <ul className='hidden md:flex space-x-6'>
          <li>
            <Link to='/' className='hover:text-gray-300'>
              Home
            </Link>
          </li>

          <li>
            <Link to='/dashboard' className='hover:text-gray-300'>
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Login / Signup */}
        <div className='hidden md:flex space-x-4'>
          {token ? (
            <button
              onClick={logout}
              className='px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 hover:cursor-pointer'
            >
              Logout
            </button>
          ) : (
            <Link
              to='/login'
              className='px-4 py-2 bg-blue-600 rounded hover:bg-blue-700'
            >
              Login
            </Link>
          )}
          {!token && (
            <Link
              to='/signup'
              className='px-4 py-2 bg-green-600 rounded hover:bg-green-700'
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button onClick={() => setIsOpen(!isOpen)} className='md:hidden'>
          <span className='text-2xl'>&#9776;</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-primary text-white py-4'>
          <ul className='flex flex-col items-center space-y-4'>
            <li>
              <Link
                to='/'
                className='hover:text-gray-300'
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/blogs'
                className='hover:text-gray-300'
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to='/dashboard'
                className='hover:text-gray-300'
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            {token ? (
              <li>
                <button
                  className='px-4 py-2 bg-blue-600 rounded hover:bg-blue-700'
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to='/login'
                  className='px-4 py-2 bg-blue-600 rounded hover:bg-blue-700'
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
            <li>
              <Link
                to='/signup'
                className='px-4 py-2 bg-green-600 rounded hover:bg-green-700'
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
