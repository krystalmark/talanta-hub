import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 shadow-2xl p-5 flex justify-between items-center sticky top-0 z-50">
      <div className="text-3xl font-extrabold text-white tracking-widest drop-shadow-lg italic">
        Talanta<span className="text-yellow-300">Hub</span>
      </div>
      <div className="space-x-3 text-lg">
        <Link to="/" className="text-white hover:text-yellow-200 font-semibold transition duration-300 ease-in-out underline-offset-2 hover:underline"> Home</Link>
        <Link to="/discover" className="text-white hover:text-yellow-200 font-semibold transition duration-300 ease-in-out underline-offset-2 hover:underline"> Discover</Link>
        <Link to="/opportunities" className="text-white hover:text-yellow-200 font-semibold transition duration-300 ease-in-out underline-offset-2 hover:underline"> Opportunities</Link>
        <Link to="/upload" className="text-white hover:text-yellow-200 font-semibold transition duration-300 ease-in-out underline-offset-2 hover:underline">Upload</Link>
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition font-semibold"
            > Login</Link>
            <Link
              to="/signup"
              className="bg-green-600 hover:bg-green-800 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition font-semibold"
            >Sign Up</Link>
          </>
        ) : (
          <>
            <span className="text-white font-light italic mr-2">👋 Welcome, <span className="font-semibold text-yellow-200">{user.name}</span></span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-800 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition font-semibold"
            >Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
