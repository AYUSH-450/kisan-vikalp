import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, type Role } from '../../context/AuthContext';

interface ProtectedRouteProps {
  requiredRole: Role;
}

export default function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to={`/login/${requiredRole}`} replace />;
  }

  if (user.role !== requiredRole) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <Outlet />;
}
