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
import { getInitials } from "../../../shared/utils/get-initial-name";
import { useEffect, useState } from "react";
import { api } from "../../../shared/lib/api";
import { workTimeArray } from "../../../shared/components/table/components/work-time-array";
import { TableSkeleton } from "../../../shared/components/table/components/table-skeleton";

type GetTechsType = {
  id: number;
  email: string;
  username: string;
  initial: string;
  workHours: workHours;
};

type workHours = {
  id: number;
  techId: number;
  workTime: string[];
};

export function Technicians() {
  const [data, setData] = useState<GetTechsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTechs() {
      try {
        const response = await api.get("/techs", {
          signal: controller.signal,
        });
        setData(response.data.techs);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTechs();

    return () => {
      controller.abort();
    };
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className="flex pt-14 justify-between">
        <p className="text-blue-dark font-semibold text-xl">Técnicos</p>
        <Button
          onClick={() => navigate("/dashboard/admin/technicians/form")}
          size={"lg"}
          className="flex items-center justify-center gap-2"
        >
          <Plus width={18} height={18} />
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
            {isLoading ? (
              <TableSkeleton
                rows={5}
                columns={[
                  { key: "username" },
                  { key: "email", hideOnMobile: true },
                  { key: "workTimeArray" },
                  { key: "actions", type: "circle", width: 24, height: 24 },
                ]}
              />
            ) : (
              data?.map((data) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell
                      className="flex items-center"
                      hasAbbreviation={getInitials(data.username)}
                    >
                      {data.username}
                    </TableCell>
                    <TableCell hideOnMobile>{data.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {data.workHours?.workTime.map((h, i) => {
                          return <div key={i}>{workTimeArray(h)}</div>;
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <Icon
                        variant="edit"
                        onClick={() =>
                          navigate(
                            `/dashboard/admin/technicians/profile/${data.id}`
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
