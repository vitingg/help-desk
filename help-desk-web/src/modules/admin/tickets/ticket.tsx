import { useEffect, useState } from "react";
import { Icon } from "../../../shared/components/edit-icon";
import { Table } from "../../../shared/components/table/table";
import { TableBody } from "../../../shared/components/table/table-body";
import { TableCell } from "../../../shared/components/table/table-cell";
import { TableHead } from "../../../shared/components/table/table-head";
import { TableHeader } from "../../../shared/components/table/table-header";
import { TableRow } from "../../../shared/components/table/table-row";
import { api } from "../../../shared/lib/api";
import { formattedDate } from "../../../shared/utils/format-date";
import { StatusTicket } from "../../../shared/components/table/components/status-ticket";
import { getInitials } from "../../../shared/utils/get-initial-name";
import { formattedId } from "../../../shared/utils/format-id";
import { formattedPrice } from "../../../shared/utils/format-price";
import { useNavigate } from "react-router";
import { TableSkeleton } from "../../../shared/components/table/components/table-skeleton";
import type { Ticket } from "../../../shared/types/tickets/ticket-response";

export function Ticket() {
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
              <TableHead>Título e Serviço</TableHead>
              <TableHead hideOnMobile>Valor total</TableHead>
              <TableHead hideOnMobile>Cliente</TableHead>
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
                      hasAbbreviation={getInitials(data.client.username)}
                    >
                      {data.client.username}
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
                          navigate(`/dashboard/admin/ticket-detail/${data.id}`)
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
