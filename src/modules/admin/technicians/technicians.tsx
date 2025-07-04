import { Button } from "../../../shared/components/button";
import { Plus } from "lucide-react";
import { TableCell } from "../../../shared/components/table/table-cell";
import { TableHead } from "../../../shared/components/table/table-head";
import { TableRow } from "../../../shared/components/table/table-row";
import { TableHeader } from "../../../shared/components/table/table-header";
import { Table } from "../../../shared/components/table/table";
import { TableBody } from "../../../shared/components/table/table-body";
import { Icon } from "../../../shared/components/edit-icon";
import { useNavigate } from "react-router";

export function Technicians() {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex pt-14 justify-between">
        <p className="text-blue-dark font-semibold text-xl">Técnicos</p>
        <Button
          onClick={() =>  navigate("/dashboard/admin/technicians/form")}
          size={"md"}
          className="flex items-center justify-center gap-2"
        >
          <Plus width={18} height={18}/>
          <span className="hidden md:table-cell">Novo</span>
        </Button>
      </div>
      <div className="pt-6">
        <Table className="table-auto w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead hideOnMobile>Email</TableHead>
              <TableHead>Disponibilidade</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center" hasAbbreviation="CS">
                Carlos Silva
              </TableCell>
              <TableCell hideOnMobile>carlos.silva@test.com</TableCell>
              <TableCell>Sequencia de horários disponíveis</TableCell>
              <TableCell className="flex justify-end">
                <Icon variant="edit" to="admin/technicians/profile" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
