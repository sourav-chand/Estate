import { Navigate } from 'react-router-dom';
import { isAuthenticated, getStoredUser } from '../../utils/api';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  const user = getStoredUser();
  if (!user?.is_admin) return <Navigate to="/" replace />;
  return <>{children}</>;
}
