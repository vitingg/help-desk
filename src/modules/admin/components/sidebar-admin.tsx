import clsx from "clsx";
import { BriefcaseBusiness, ClipboardList, Users, Wrench } from "lucide-react";
import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";
import {
  baseLinkClasses,
  activeLinkClasses,
} from "../../../shared/components/sidebar/export-sidebar-variance";
import { SidebarContent } from "../../../shared/components/sidebar/sidebar-content";

export function AdminSidebar() {
  const navItem = [
    {
      name: "Chamados",
      icon: <ClipboardList />,
      path: "/dashboard/admin/ticket",
    },
    { name: "Técnicos", icon: <Users />, path: "/dashboard/admin/tech" },
    {
      name: "Clientes",
      icon: <BriefcaseBusiness />,
      path: "/dashboard/admin/client",
    },
    { name: "Serviços", icon: <Wrench />, path: "/dashboard/admin/services" },
  ];
  return (
    <SidebarContent>
      {navItem.map((item) => (
        <li className="flex" key={item.name}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              twMerge(
                clsx(baseLinkClasses, isActive && activeLinkClasses),
                "flex items-center justify-center pl-6"
              )
            }
          >
            <span className="flex gap-2 w-full">
              {item.icon} {item.name}
            </span>
          </NavLink>
        </li>
      ))}
    </SidebarContent>
  );
}
