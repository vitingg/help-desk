import background from "../../../shared/assets/images/Login_Background.png";
import { Navigate, Outlet } from "react-router";
import { Icon } from "./icon";
import { useAuth } from "../../../shared/context/auth-context";

export function AuthLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (user?.role) {
    switch (user.role) {
      case "ADMIN":
        return <Navigate to="/dashboard/admin/tickets" replace />;
      case "TECH":
        return <Navigate to="/dashboard/tech/tickets" replace />;
      case "CLIENT":
        return <Navigate to="/dashboard/client/tickets" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }
  console.log(user);
  return (
    <div className="relative md:min-h-screen grid grid-cols-2 md:grid-cols-2 ">
      <img
        className="absolute w-full h-full inset-0 object-cover z-[-1]"
        src={background}
      />

      <div className=" md:col-start-2 col-span-2 mt-8 md:mt-3 z-10">
        <div className="bg-gray-600 p-8 h-full flex flex-col justify-center items-center rounded-tr-2xl md:rounded-tr-none rounded-tl-2xl w-full">
          <Icon />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
