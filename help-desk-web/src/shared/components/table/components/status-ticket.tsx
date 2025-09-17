import { CircleCheckBig, Clock, Clock2 } from "lucide-react";

export function StatusTicket(status: string) {
  switch (status) {
    case "IN_PROGRESS":
      return (
        <div className="font-bold bg-feedback-progressBackground text-feedback-progress w-fit text-sm md:w-fit rounded-2xl gap-1 p-2 flex items-center justify-center">
          <p>
            <Clock2 className="w-4 h-4" />
          </p>{" "}
          <p>Em atendimento</p>
        </div>
      );
    case "PENDING":
      return (
        <div className="font-bold bg-feedback-openBackground text-feedback-open w-fit text-sm md:w-fit rounded-2xl gap-1 p-2 flex items-center justify-center">
          <Clock className="w-4 h-4" />
          <p>Aberto</p>
        </div>
      );
    case "COMPLETE":
      return (
        <div className="font-bold bg-feedback-doneBackground text-feedback-done w-fit text-sm md:w-fit rounded-2xl gap-1 p-2 flex items-center justify-center">
          <CircleCheckBig className="w-4 h-4" />
          <p>Completo</p>
        </div>
      );
    default:
      return <p>sem status</p>;
  }
}
