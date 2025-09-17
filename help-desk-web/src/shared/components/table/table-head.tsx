import type { ReactNode } from "react";

type TableHeadProps = {
  children?: ReactNode;
  className?: string;
  hideOnMobile?: boolean;
};

export function TableHead({
  children,
  className,
  hideOnMobile,
}: TableHeadProps) {
  return (
    <th
      className={`px-5 py-3 text-gray-400 text-left align-middle  ${
        hideOnMobile && "hidden md:table-cell"
      }  ${className}`}
    >
      {children}
    </th>
  );
}
