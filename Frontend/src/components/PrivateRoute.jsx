import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children, allowedRoles }) {
  const { user ,role  } = useAuth();                

  // not signed‑in -> go sign‑up
  if (!user) return <Navigate to="/signup" replace />;

  // wrong role -> home
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
