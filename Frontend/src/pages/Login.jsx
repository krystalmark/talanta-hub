// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hint, setHint] = useState(() => {
    // If they registered before, show a gentle hint of their email
    const db = JSON.parse(localStorage.getItem('talanta_users') || '{}');
    const first = Object.keys(db)[0];
    return first ? `Did you register as “${first}”?` : '';
  });
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const ok = login({ email, password });
    if (!ok) return setError('Invalid email or password.');
    navigate('/');
  };

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-4">Login</h2>
      {hint && <div className="alert alert-info py-2">{hint}</div>}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={submit} className="vstack gap-3">
        <input
          className="form-control"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100">Log In</button>
      </form>
    </div>
  );
}
