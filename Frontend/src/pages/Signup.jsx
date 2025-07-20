import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'youth',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await signup(form);
    if (!ok) return setError('Signup failed. Try different credentials.');
    localStorage.setItem('lastSignupEmail', form.email.toLowerCase());
    navigate('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-200 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Account</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 mb-4 border">
          <option value="youth">Youth</option>
          <option value="mentor">Mentor</option>
          <option value="sponsor">Sponsor</option>
          <option value="organization">Organization</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Sign Up</button>
      </form>
    </main>
  );
}
