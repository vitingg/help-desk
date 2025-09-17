import type { Ticket } from "../../../shared/types/tickets/ticket-response";
import { HeaderAction } from "../../../shared/components/header-action";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../../shared/lib/api";
import {
  TicketDetail,
  TicketDetailSkeleton,
} from "../../../shared/components/tickets/ticket-detail";
import {
  PriceHistory,
  PriceHistorySkeleton,
} from "../../../shared/components/tickets/ticket-price-history";

export function ClientDetail() {
  const [data, setData] = useState<Ticket>();

  const { id } = useParams();

  useEffect(() => {
    async function getTicket() {
      try {
        const response = await api.get(`/services/${id}`);
        setData(response.data.tickets);
        console.log(response.data.tickets);
      } catch (error) {
        console.log(error);
      }
    }
    getTicket();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="p-14 flex flex-col justify-center">
        <HeaderAction title="Chamado detalhado" />

        <div className="pt-6 flex flex-col md:flex-row md:items-start gap-6 ">
          {data ? <TicketDetail data={data} /> : <TicketDetailSkeleton />}
          {data ? <PriceHistory data={data} /> : <PriceHistorySkeleton />}
        </div>
      </div>
    </div>
  );
}
