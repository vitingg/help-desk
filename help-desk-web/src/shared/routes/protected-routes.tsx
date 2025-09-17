import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/auth-context";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    <div>carregando...</div>;
  }

  if (!user) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  const isAuthorized = allowedRoles.includes(user.role);

  if (isAuthorized) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/sign-in" replace />;
  }
}
