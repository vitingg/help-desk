import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";
import { Status } from "../status";

type TableCellProps = {
  children?: ReactNode;
  hasAbbreviation?: string;
  status?: "Aberto" | "Em Atendimento" | "Encerrado";
  className?: string;
  hideOnMobile?: boolean;
};

const tableCellVariants = cva("", {
  variants: {
    type: {
      default: "",
      profile: "",
      status: "",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

export function TableCell({
  children,
  status,
  hasAbbreviation,
  className,
  hideOnMobile,
}: TableCellProps) {
  let cellContent: ReactNode = children;
  let cellType: "default" | "profile" | "status" = "default";

  if (hasAbbreviation) {
    cellContent = (
      <ProfileContent hasAbbreviation={hasAbbreviation}>
        {children}
      </ProfileContent>
    );
    cellType = "profile";
  } else if (status) {
    cellContent = <Status status={status} />;
    cellType = "status";
  }

  return (
    <td
      className={cn(
        "px-5 py-3 align-middle",
        tableCellVariants({ type: cellType }),
        className,
        hideOnMobile && "hidden md:table-cell"
      )}
    >
      {cellContent}
    </td>
  );
}

type ProfileContentProps = {
  children?: ReactNode;
  hasAbbreviation: string;
  className?: string;
};

export function ProfileContent({
  children,
  hasAbbreviation,
  className,
}: ProfileContentProps) {
  const isImage =
    hasAbbreviation.startsWith("http") ||
    hasAbbreviation.startsWith("data:image/");

  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          className={`bg-blue-dark rounded-full w-8 h-8 text-white flex items-center justify-center ${className}`}
        >
          {isImage ? <img src={hasAbbreviation} /> : hasAbbreviation}
        </div>
        <p>{children}</p>
      </div>
    </div>
  );
}
