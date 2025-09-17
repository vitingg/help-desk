import type { ReactNode } from "react";

type tableProps = {
  children: ReactNode;
  className?: string;
};

export function Table({ children, className }: tableProps) {
  return (
    <div className=" overflow-hidden scroll-auto rounded-xl border border-gray-500 mb-6  ">
      <table
        className={`
      border border-gray-500 min-w-full border-collapse ${className}`}
      >
        {children}
      </table>
    </div>
  );
}
