import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Youth');
  const [opportunity, setOpportunity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = signup(name, email, password, role, opportunity);
    if (!success) {
      setError('⚠️ User already exists.');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white shadow-xl rounded-xl p-10">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">📝 Create Your TalantaHub Account</h2>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="🙋 Full Name"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            required
            placeholder="📧 Email address"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="🔑 Password"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full px-4 py-2 border rounded-lg shadow-sm bg-white focus:ring-pink-500 focus:border-pink-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Youth">Youth</option>
            <option value="Mentor">Mentor</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Organization">Organization</option>
          </select>

          {(role === 'Mentor' || role === 'Sponsor' || role === 'Organization') && (
            <textarea
              placeholder="💡 Describe your opportunity for youths..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
              value={opportunity}
              onChange={(e) => setOpportunity(e.target.value)}
            />
          )}

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-800 text-white py-2 rounded-lg font-semibold shadow-lg transition duration-300"
          >
            🌟 Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
