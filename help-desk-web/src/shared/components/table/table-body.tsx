import type { ReactNode } from "react";

type TableBodyProps = {
  children: ReactNode;
};

// Aqui eu devo acrescentar o botão com a caneta, no figma, seria o "editar"

export function TableBody({ children }: TableBodyProps) {
  return <tbody className="divide-y divide-gray-500">{children}</tbody>;
}
