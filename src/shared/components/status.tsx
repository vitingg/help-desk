import { CircleHelp, Clock2, CircleCheckBig } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

const statusVariants = cva(" p-1 flex items-center justify-center", {
  variants: {
    status: {
      Aberto: "bg-feedback-openBackground text-feedback-open w-fit md:w-fit",
      "Em Atendimento":
        "bg-feedback-progressBackground text-feedback-progress w-fit md:w-fit",
      Fechado: "bg-feedback-doneBackground text-feedback-done w-fit md:w-fit ",
    },
    size: {
      sm: "rounded-full",
      md: "rounded-2xl gap-1",
    },
  },
  defaultVariants: {
    status: "Aberto",
    size: "md",
  },
});

const statusIcons = {
  Aberto: CircleHelp,
  "Em Atendimento": Clock2,
  Fechado: CircleCheckBig,
};

type StatusProps = {
  status: "Aberto" | "Em Atendimento" | "Fechado";
  size?: "sm" | "md";
  showText?: boolean;
  className?: string;
};

export function Status({
  status,
  showText = true,
  size = "md",
  className,
}: StatusProps) {
  const Icon = statusIcons[status];

  return (
    <div className={cn(statusVariants({ status, size }), className)}>
      <Icon width={16} height={16} />
      {showText && <p className="text-xs font-semibold">{status}</p>}
    </div>
  );
}
