// 🔐 AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

/* ——— localStorage keys ——— */
const LOCAL_USER_KEY = 'talanta_user';
const USERS_DB_KEY   = 'talanta_users_db';

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);   // full user object
  const [role, setRole]   = useState(null);   // convenience string (lower‑case)

  /* Restore session on reload */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_USER_KEY));
    if (saved) {
      setUser(saved);
      setRole(saved.role.toLowerCase());
    }
  }, []);

  /* ---------- helpers ---------- */
  const persistUser   = (u) => localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(u));
  const fetchAllUsers = () => JSON.parse(localStorage.getItem(USERS_DB_KEY)) || [];
  const saveUsers     = (arr) => localStorage.setItem(USERS_DB_KEY, JSON.stringify(arr));

  /* ---------- mutate ---------- */
  const signup = ({ username, email, password, role }) => {
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
      role: role.toLowerCase(),   // normalize once here
    };

    /* save in “session” */
    persistUser(newUser);
    setUser(newUser);
    setRole(newUser.role);

    /* save in “DB” */
    const all = fetchAllUsers().filter((u) => u.email !== email);
    all.push(newUser);
    saveUsers(all);
  };

  const login = ({ email, password }) => {
    const found = fetchAllUsers().find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return false;

    persistUser(found);
    setUser(found);
    setRole(found.role.toLowerCase());
    return true;
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
    setRole(null);
  };

  const updateUsername = (newUsername) => {
    if (!user) return;
    const updated = { ...user, username: newUsername };
    setUser(updated);
    persistUser(updated);

    /* reflect in “DB” */
    const all = fetchAllUsers().map((u) =>
      u.id === updated.id ? updated : u
    );
    saveUsers(all);
  };

  /* ---------- context value ---------- */
  return (
    <AuthContext.Provider
      value={{
        user,              // { id, username, email, role, ... }
        role,              // e.g. "mentor"
        signup,
        login,
        logout,
        updateUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* custom hook */
export const useAuth = () => useContext(AuthContext);
