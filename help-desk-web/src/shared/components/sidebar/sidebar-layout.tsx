import type { ReactNode } from "react";

type SidebarLayout = {
  children: ReactNode;
};

export function SidebarLayout({ children }: SidebarLayout) {
  return (
    <nav className="flex items-center justify-between md:h-full md:flex-col">
      {children}
    </nav>
  );
}
