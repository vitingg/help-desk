import { Ban, CircleCheck } from "lucide-react";

type ChangeStatusProps = {
  status: boolean;
  id: number;
  onChangeStatus: (id: number) => void | Promise<void>;
};

export function ChangeStatus({
  status,
  id,
  onChangeStatus,
}: ChangeStatusProps) {
  if (status == true) {
    return (
      <button
        className="flex items-center justify-center p-2 gap-1 text-gray-300 font-bold cursor-pointer"
        onClick={() => onChangeStatus(id)}
      >
        <Ban className="size-4" />
        <p>Desativar</p>
      </button>
    );
  } else {
    return (
      <button
        className="flex items-center justify-center p-2 gap-1 text-gray-300 font-bold cursor-pointer"
        onClick={() => onChangeStatus(id)}
      >
        <CircleCheck className="size-4" />
        <p>Reativar</p>
      </button>
    );
  }
}
