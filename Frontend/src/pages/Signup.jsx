import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();

  /* redirect if already logged‑in */
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'youth',
    opportunityInfo: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = signup(form);
    if (!ok) return setError('Signup failed – try different credentials.');
    navigate('/');
    // after if (ok) navigate('/'); etc.
localStorage.setItem('lastSignupEmail', form.email.trim().toLowerCase());

  };

  const isOpportunityProvider = ['mentor', 'sponsor', 'organization'].includes(
    form.role
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#10D164] to-[#009245] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <label className="block font-semibold">Register as:</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="youth">Youth</option>
            <option value="mentor">Mentor</option>
            <option value="sponsor">Sponsor</option>
            <option value="organization">Organization</option>
          </select>

          {isOpportunityProvider && (
            <textarea
              name="opportunityInfo"
              rows={4}
              placeholder="Describe the opportunities you provide (optional)"
              value={form.opportunityInfo}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-6 text-sm text-center">
          Already signed up?{' '}
          <a href="/login" className="text-green-700 hover:underline">
            Log in here
          </a>
        </p>
      </form>
    </main>
  );
}
