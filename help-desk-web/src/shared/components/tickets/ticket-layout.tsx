import type { ReactNode } from "react";

type TicketLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function TicketLayout({ children, className }: TicketLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-6">
      <div className={`border border-gray-500 rounded-md p-6 ${className}`}>
        {children}
      </div>
    </div>
  );
}
