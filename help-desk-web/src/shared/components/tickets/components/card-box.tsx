import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

type CardBoxProps = {
  children: ReactNode;
  className?: string;
};

export function CardBox({ children, className }: CardBoxProps) {
  return <div className={cn("pb-5", className)}>{children}</div>;
}
