import { Eye, PenLine, Trash } from "lucide-react";
import { Button } from "./button";
import type { ReactNode } from "react";

const iconMap = {
  edit: <PenLine width={"14"} height={"14"} />,
  look: <Eye width={"14"} height={"14"} />,
  delete: <Trash width={"14"} height={"14"} className="text-red-500" />,
};

type iconProps = {
  variant: keyof typeof iconMap;
  onClick?: () => void;
};

export function Icon({ variant = "edit", onClick }: iconProps) {
  const IconComponent: ReactNode = iconMap[variant];
  return (
    <Button
      size="4xs"
      variant={"secondary"}
      className="flex items-center justify-center"
      onClick={onClick}
    >
      {IconComponent}
    </Button>
  );
}
