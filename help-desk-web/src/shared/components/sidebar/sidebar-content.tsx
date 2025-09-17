import type { ReactNode } from "react";

type SidebarContentProps = {
  children: ReactNode;
};

export function SidebarContent({ children }: SidebarContentProps) {
  return (
    <div className="flex flex-col flex-1 justify-start pt-5">
      <ul className="space-y-1 flex flex-col items-start">{children}</ul>
    </div>
  );
}
