import type { ReactNode } from "react";

type TableRowProps = {
  children: ReactNode;
  isBody?: boolean;
  className?: string;
};

export function TableRow({ children, className }: TableRowProps) {
  return <tr className={`${className}`}>{children}</tr>;
}
