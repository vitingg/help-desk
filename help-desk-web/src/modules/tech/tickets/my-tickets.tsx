import { Container } from "../components/container";
import { Status } from "../../../shared/components/status";
import { useEffect, useState } from "react";
import { api } from "../../../shared/lib/api";
import type { Ticket } from "../../../shared/types/tickets/ticket-response";
import { useAuth } from "../../../shared/context/auth-context";

export function TechTickets() {
  const [data, setData] = useState<Ticket[]>([]);
  const { user } = useAuth();

  async function fetchServices() {
    try {
      const response = await api.get("/services");
      setData(response.data.tickets);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchClients() {
      try {
        const response = await api.get("/services", {
          signal: controller.signal,
        });
        setData(response.data.tickets);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClients();

    return () => {
      controller.abort();
    };
  }, []);

  const pending = data.filter((s) => s.status === "PENDING");
  const inProgress = data.filter(
    (s) => s.status === "IN_PROGRESS" && s.tech.id == user?.id
  );
  const done = data.filter(
    (s) => s.status === "COMPLETE" && s.tech.id == user?.id
  );

  const grouped = [
    { label: "Em Atendimento" as const, items: inProgress },
    { label: "Aberto" as const, items: pending },
    { label: "Encerrado" as const, items: done },
  ];

  return (
    <div className="pt-14">
      <p className="text-blue-dark font-semibold text-xl">Meus chamados</p>

      {grouped.map((group) => (
        <div key={group.label} className="pt-6">
          <Status status={group.label} />
          <div className="pt-4 grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] ">
            {group.items.map((p) => (
              <Container key={p.id} data={p} onAction={fetchServices} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
