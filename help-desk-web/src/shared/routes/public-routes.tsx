import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";

export function PublicRoutes() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>carregando...</div>;
  }

  if (user) {
    switch (user.role) {
      case "ADMIN":
        navigate("/dashboard/admin/tickets");
        break;
      case "TECH":
        navigate("/dashboard/tech");
        break;
      case "CLIENT":
        navigate("/dashboard/client/tickets");
        break;
      default:
        navigate("/");
    }
  }

  return <Outlet />;
}
