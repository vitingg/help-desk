import type { ReactNode } from "react";

type ModalContentProps = {
  children: ReactNode;
};

export function ModalContent({ children }: ModalContentProps) {
  return <div className="flex flex-col gap-4 pt-6 p-7">{children}</div>;
}
