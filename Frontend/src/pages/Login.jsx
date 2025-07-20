import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form);
    if (!ok) return setError('Login failed. Check credentials.');
    navigate('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Log In</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-2 mb-4 border" />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Log In</button>
      </form>
    </main>
  );
}
