import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

type HeaderActionProps = {
  title: string;
};

export function HeaderAction({ title }: HeaderActionProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="flex flex-col pb-3 md:pb-0">
        <div
          onClick={() => navigate(-1)}
          className="text-gray-300 font-semibold gap-2 flex items-center cursor-pointer"
        >
          <ArrowLeft /> Voltar
        </div>
        <p className="text-blue-dark font-semibold text-xl">{title}</p>
      </div>
    </div>
  );
}
