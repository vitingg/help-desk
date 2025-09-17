import { TableRow } from "../table-row";
import { TableCell } from "../table-cell";
import Skeleton from "react-loading-skeleton";

type SkeletonColumn = {
  key: string;
  type?: "text" | "circle";
  width?: number;
  height?: number;
  count?: number;
  hideOnMobile?: boolean;
};

interface TableSkeletonProps {
  rows?: number;
  columns: SkeletonColumn[];
}

export function TableSkeleton({ rows = 5, columns }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((col) => (
            <TableCell
              key={col.key}
              hideOnMobile={col.hideOnMobile}
              className={col.type === "circle" ? "flex justify-center" : ""}
            >
              <Skeleton
                height={col.height ?? 20}
                width={col.width}
                count={col.count}
                circle={col.type === "circle"}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
