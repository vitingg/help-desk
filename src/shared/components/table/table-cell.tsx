import { CircleHelp, Clock2, CircleCheckBig } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

type TableCellProps = {
  children?: ReactNode;
  hasAbbreviation?: string;
  status?: "Aberto" | "Em Atendimento" | "Fechado";
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
  hasAbbreviation?: string;
};

function ProfileContent({ children, hasAbbreviation }: ProfileContentProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="bg-blue-dark rounded-full w-8 h-8 text-white flex items-center justify-center">
          {hasAbbreviation}
        </div>
        <p>{children}</p>
      </div>
    </div>
  );
}

type StatusProps = VariantProps<typeof statusVariants> & {
  status: "Aberto" | "Em Atendimento" | "Fechado";
};

// utilizando o cva pra manusear mais fácil os status
const statusVariants = cva("gap-1 p-1 flex items-center rounded-2xl", {
  variants: {
    status: {
      Aberto: "bg-feedback-openBackground text-feedback-open",
      "Em Atendimento": "bg-feedback-progressBackground text-feedback-progress",
      Fechado: "bg-feedback-doneBackground text-feedback-done",
    },
  },
  defaultVariants: {
    status: "Aberto",
  },
});

const statusIcons = {
  Aberto: CircleHelp,
  "Em Atendimento": Clock2,
  Fechado: CircleCheckBig,
};

// função status que maneja o ícone
function Status({ status }: StatusProps) {
  const Icon = statusIcons[status];

  return (
    <div className={cn(statusVariants({ status }))}>
      <Icon width={16} height={16} />
      <p className="text-xs font-semibold">{status}</p>
    </div>
  );
}
