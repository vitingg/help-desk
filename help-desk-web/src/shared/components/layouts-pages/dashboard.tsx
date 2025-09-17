import type { ReactNode } from "react";

type DashboardProps = {
  children: ReactNode;
};

export function Dashboard({ children }: DashboardProps) {
  return (
    <div
      className="md:flex-1 rounded-tl-3xl rounded-tr-3xl md:rounded-tl-xl md:rounded-tr-none 
    h-full bg-gray-600 text-gray-200 overflow-y-auto"
    >
      <div className="h-full pl-12 pr-12">{children}</div>
    </div>
  );
}
