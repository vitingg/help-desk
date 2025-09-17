import { type ReactNode } from "react";

type ModalFooterProps = {
  children: ReactNode;
};

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <>
      <div className="w-full border-b-gray-500 border-b-1 b-0" />
      <div className="flex items-center justify-between gap-2 pt-6 pb-8 pr-7 pl-7">
        {children}
      </div>
    </>
  );
}
