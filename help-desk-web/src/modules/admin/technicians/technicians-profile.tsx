import { Outlet } from "react-router";

export function TechniciansProfile() {
  return (
    <div className="flex justify-center">
      <div className="pl-6 pr-6">
        <div className="flex flex-col md:flex-row gap-6 pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
