import clsx from "clsx";
import { ClipboardList } from "lucide-react";
import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";
import {
  baseLinkClasses,
  activeLinkClasses,
} from "../../../shared/components/sidebar/export-sidebar-variance";
import { SidebarContent } from "../../../shared/components/sidebar/sidebar-content";

export function TechSidebar({ isOpen }: { isOpen?: boolean }) {
  const navItem = [
    {
      name: "Meus chamados",
      icon: <ClipboardList />,
      path: "/dashboard/tech/tickets",
    },
  ];

  return (
    <SidebarContent>
      {navItem.map((item) => (
        <li
          className={`md:flex w-full ${isOpen ? "flex" : "hidden"}`}
          key={item.name}
        >
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              twMerge(
                clsx(baseLinkClasses, isActive && activeLinkClasses),
                "flex items-center justify-start pl-5"
              )
            }
          >
            <span className="flex flex-row gap-2">
              {item.icon} {item.name}
            </span>
          </NavLink>
        </li>
      ))}
    </SidebarContent>
  );
}
