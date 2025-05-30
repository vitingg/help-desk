import { TicketTable } from "./table";

export function Dashboard() {
  return (
    <div className="h-full w-full rounded-tl-xl bg-gray-600 text-gray-200 pl-12 pr-12">
      <div className="flex pt-14">
        <p className="text-blue-dark font-semibold text-xl">Chamados</p>
      </div>
      <div className="pt-6">
        <TicketTable />
      </div>
    </div>
  );
}
