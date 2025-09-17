import { type ReactNode } from "react";

type ModalLayoutProps = {
  open?: boolean;
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
};

export function ModalLayout({ children }: ModalLayoutProps) {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/20 flex justify-center items-center z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-600 shadow text-gray-200 rounded-2xl transition-all"
      >
        {children}
      </div>
    </div>
  );
}
