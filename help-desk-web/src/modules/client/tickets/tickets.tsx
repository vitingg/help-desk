import { TableSkeleton } from "../../../shared/components/table/components/table-skeleton";
import { StatusTicket } from "../../../shared/components/table/components/status-ticket";
import { TableHeader } from "../../../shared/components/table/table-header";
import type { Ticket } from "../../../shared/types/tickets/ticket-response";
import { TableBody } from "../../../shared/components/table/table-body";
import { TableCell } from "../../../shared/components/table/table-cell";
import { TableHead } from "../../../shared/components/table/table-head";
import { TableRow } from "../../../shared/components/table/table-row";
import { getInitials } from "../../../shared/utils/get-initial-name";
import { formattedPrice } from "../../../shared/utils/format-price";
import { formattedDate } from "../../../shared/utils/format-date";
import { Table } from "../../../shared/components/table/table";
import { formattedId } from "../../../shared/utils/format-id";
import { Icon } from "../../../shared/components/edit-icon";
import { api } from "../../../shared/lib/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function ClientTickets() {
  const [data, setData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTickets() {
      try {
        const response = await api.get("/services", {
          signal: controller.signal,
        });
        setData(response.data.tickets);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <div className="flex pt-14">
        <p className="text-blue-dark font-semibold text-xl">Chamados</p>
      </div>
      <div className="pt-6">
        <Table className="table-auto w-full">
          <TableHeader>
            <TableRow isBody={false}>
              <TableHead>Atualizado em</TableHead>
              <TableHead hideOnMobile>Id</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead hideOnMobile>Valor total</TableHead>
              <TableHead hideOnMobile>Técnico</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableSkeleton
                rows={8}
                columns={[
                  { key: "updatedAt" },
                  { key: "id", hideOnMobile: true },
                  { key: "title", count: 2 },
                  { key: "price", hideOnMobile: true },
                  { key: "client", hideOnMobile: true },
                  { key: "tech", hideOnMobile: true },
                  { key: "status" },
                  { key: "actions", type: "circle", width: 24, height: 24 },
                ]}
              />
            ) : (
              data?.map((data) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell>{formattedDate(data.updatedAt)}</TableCell>
                    <TableCell hideOnMobile className="font-bold text-sm">
                      {formattedId(data.id)}
                    </TableCell>
                    <TableCell className="flex flex-col">
                      <div className="font-bold line-clamp-1">{data.title}</div>
                      <div className="line-clamp-1">
                        {data.categories[0].category.name}
                      </div>
                    </TableCell>
                    <TableCell hideOnMobile>
                      {formattedPrice(
                        data.categories.reduce(
                          (acc, cat) => acc + (cat.category?.basePrice ?? 0),
                          0
                        )
                      )}
                    </TableCell>
                    <TableCell
                      hideOnMobile
                      hasAbbreviation={getInitials(
                        data.tech ? data.tech.username : "Não definido"
                      )}
                    >
                      {data.tech ? data.tech.username : "Não definido"}
                    </TableCell>
                    <TableCell>{StatusTicket(data.status)}</TableCell>
                    <TableCell>
                      <Icon
                        variant="edit"
                        onClick={() =>
                          navigate(`/dashboard/client/ticket-detail/${data.id}`)
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
