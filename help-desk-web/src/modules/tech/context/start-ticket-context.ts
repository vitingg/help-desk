import { useState } from "react";
import { api } from "../../../shared/lib/api";
import { useAuth } from "../../../shared/context/auth-context";

export function useTicketActions(ticketId: number) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const assignAndStart = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await api.patch(`/services/${ticketId}/assign`, { techId: user.id });
    } catch (error) {
      console.error("Erro ao iniciar o chamado", error);
    } finally {
      setIsLoading(false);
    }
  };

  const complete = async () => {
    setIsLoading(true);
    try {
      await api.patch(`/services/${ticketId}/change-status`, {
        status: "COMPLETE",
      });
    } catch (error) {
      console.error("Erro ao encerrar o chamado", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { assignAndStart, complete, isLoading };
}
