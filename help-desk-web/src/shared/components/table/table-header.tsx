import type { ReactNode } from "react";

type TableHeaderProps = {
  children: ReactNode;
};

export function TableHeader({ children }: TableHeaderProps) {
  return <thead className="border border-gray-500">{children}</thead>;
}
