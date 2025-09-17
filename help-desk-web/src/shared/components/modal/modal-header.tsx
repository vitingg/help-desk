import { X } from "lucide-react";
import { type ReactNode } from "react";
import { useModal } from "./hooks/useModalContext";

type ModalHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function ModalHeader({ children, className }: ModalHeaderProps) {
  const { closeModal } = useModal();
  return (
    <>
      <div className="flex items-center justify-between gap-2 p-5">
        <p className={`font-bold text-md ${className}`}>{children}</p>
        <button onClick={closeModal} className="cursor-pointer">
          <X size={18} />
        </button>
      </div>
      <div className="w-full border-b-gray-500 border-b-1 b-0" />
    </>
  );
}
