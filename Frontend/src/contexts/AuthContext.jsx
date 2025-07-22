// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const LOCAL_USER_KEY = 'talanta_user';
const BACKEND_URL = 'http://127.0.0.1:8000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_USER_KEY));
    if (saved) {
      setUser(saved);
      setRole(saved.role);
    }
  }, []);

  const persistUser = (userObj) => {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userObj));
    setUser(userObj);
    setRole(userObj.role);
  };

  const signup = async ({ username, email, password, role }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!res.ok) return false;

      const data = await res.json(); // { token: '...', ... }
      persistUser({ username, email, role, token: data.token });
      return true;
    } catch (err) {
      console.error('Signup error:', err);
      return false;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      const data = await res.json(); // { token, username, role }
      persistUser({
        username: data.username,
        email,
        role: data.role,
        token: data.token,
      });

      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
