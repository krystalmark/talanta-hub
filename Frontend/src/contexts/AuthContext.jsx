import { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// Auth provider
export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const signup = (name, email, password, role, opportunity) => {
    if (users.find((u) => u.email === email)) return false;
    const newUser = { name, email, password, role, opportunity };
    setUsers((prev) => [...prev, newUser]);
    return true;
  };

  const login = (email, password) => {
    const existingUser = users.find((u) => u.email === email && u.password === password);
    if (!existingUser) return false;
    setUser(existingUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ users, user, signup, login, logout, setUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Only define this once!
export function useAuth() {
  return useContext(AuthContext);
}
