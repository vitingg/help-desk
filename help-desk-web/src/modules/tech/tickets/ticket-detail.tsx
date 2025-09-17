import type { Ticket } from "../../../shared/types/tickets/ticket-response";
import { HeaderAction } from "../../../shared/components/header-action";
import { useTicketActions } from "../context/start-ticket-context";
import { Button } from "../../../shared/components/button";
import { CircleCheckBig, Clock2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { api } from "../../../shared/lib/api";
import { useEffect, useState } from "react";
import {
  AdditionalService,
  AdditionalServiceSkeleton,
} from "../components/ticket-additional-services";
import {
  TicketDetail,
  TicketDetailSkeleton,
} from "../../../shared/components/tickets/ticket-detail";
import {
  PriceHistory,
  PriceHistorySkeleton,
} from "../../../shared/components/tickets/ticket-price-history";

export function TechDetail() {
  const navigate = useNavigate();
  const [data, setData] = useState<Ticket>();
  const { id } = useParams();
  const ticketId = Number(id);
  const { assignAndStart, complete, isLoading } = useTicketActions(ticketId);

  async function getTicket() {
    try {
      const response = await api.get(`/services/${id}`);
      setData(response.data.tickets);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) {
      getTicket();
    }
  }, [id]);

  async function handleAssign() {
    await assignAndStart();
    getTicket();
    navigate("/dashboard/tech/tickets");
  }

  async function handleComplete() {
    await complete();
    getTicket();
    navigate("/dashboard/tech/tickets");
  }

  function renderActionButtons() {
    if (!data) return null;

    switch (data.status) {
      case "PENDING":
        return (
          <div className="flex gap-2 items-center ">
            <Button
              onClick={complete}
              size={"xl"}
              variant={"secondary"}
              className="font-bold w-1/2 flex gap-2 items-center justify-center"
            >
              <CircleCheckBig />
              Encerrar
            </Button>
            <Button
              onClick={handleAssign}
              size={"2xl"}
              className="flex items-center justify-center font-bold w-1/2 gap-2"
            >
              <Clock2 />
              Iniciar atendimento
            </Button>
          </div>
        );
      case "IN_PROGRESS":
        return (
          <Button
            onClick={handleComplete}
            disabled={isLoading}
            size={"xl"}
            className="font-bold w-full md:w-auto flex gap-2 items-center justify-center"
          >
            <CircleCheckBig />
            Encerrar
          </Button>
        );
      case "COMPLETE":
        return null;
      default:
        return null;
    }
  }

  return (
    <div className="flex justify-center">
      <div className="pt-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6">
          <HeaderAction title="Chamado detalhado" />
          <div className="flex gap-2 items-center ">
            {renderActionButtons()}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2">
            {data ? <TicketDetail data={data} /> : <TicketDetailSkeleton />}

            {data ? (
              <AdditionalService data={data} onSubmit={getTicket} />
            ) : (
              <AdditionalServiceSkeleton />
            )}
          </div>
          {data ? <PriceHistory data={data} /> : <PriceHistorySkeleton />}
        </div>
      </div>
    </div>
  );
}
