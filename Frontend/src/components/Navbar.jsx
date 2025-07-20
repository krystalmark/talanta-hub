import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const linkBase =
    'block px-4 py-2 text-white no-underline hover:text-yellow-200 hover:bg-white/10 px-4 py-2 rounded font-medium tracking-wide  transition duration-200';

  return (
    <header className="bg-gradient-to-br from-[#5761B2] to-[#1FC5A8] sticky top-0 z-50 shadow">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Brand logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-2xl  no-underline font-extrabold tracking-wide text-white select-none"
        >
          Talanta<span className="text-yellow-300">Hub</span>
        </Link>

        {/* Toggle for mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={linkBase} >Home</Link>
          <Link to="/discover" className={linkBase}>Discover</Link>
          <Link to="/opportunities" className={linkBase}>Opportunities</Link>
          <Link to="/upload" className={linkBase}>Upload</Link>

          {!user ? (
            <>
             <Link to="/login" className="bg-white text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-full font-semibold shadow transition no-underline">Login</Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-full font-semibold shadow transition no-underline"
            >
              Sign Up
            </Link>
            </>
          ) : (
            <>
              <span className="italic text-sm text-white">Hi, <strong>{user.username || 'User'}</strong></span>
              <button
                onClick={handleLogout}
                className="ml-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Mobile nav dropdown */}
      {open && (
        <div className="md:hidden bg-[#374a5a] border-t border-white/10 px-4 pb-4">
          <Link to="/" className={linkBase} onClick={() => setOpen(false)}>Home</Link>
          <Link to="/discover" className={linkBase} onClick={() => setOpen(false)}>Discover</Link>
          <Link to="/opportunities" className={linkBase} onClick={() => setOpen(false)}>Opportunities</Link>
          <Link to="/upload" className={linkBase} onClick={() => setOpen(false)}>Upload</Link>

          {!user ? (
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="block w-full mt-4 text-center bg-white text-indigo-700 py-2 rounded-full font-semibold"
            >
              Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full mt-4 bg-red-600 text-white py-2 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
