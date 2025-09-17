import { Button } from "../../../shared/components/button";
import { Plus } from "lucide-react";
import { TicketLayout } from "../../../shared/components/tickets/ticket-layout";
import { Icon } from "../../../shared/components/edit-icon";
import type { Ticket } from "../../../shared/types/tickets/ticket-response";
import { formattedPrice } from "../../../shared/utils/format-price";
import Skeleton from "react-loading-skeleton";
import { useModal } from "../../../shared/components/modal/hooks/useModalContext";
import { AdditionalServiceModal } from "./additional-service-modal";

interface TicketDetailProps {
  data: Ticket;
  onSubmit?: () => void;
}

export function AdditionalService({ data, onSubmit }: TicketDetailProps) {
  const { openModal } = useModal();

  const additionalServices = data.categories.filter(
    (c) => c.type === "ADDITIONAL"
  );
  return (
    <TicketLayout className="min-w-md">
      <div className="flex justify-between items-center">
        <p className="text-xs font-bold text-gray-400">Serviços adicionais</p>
        <Button
          size={"4xs"}
          className="flex items-center justify-center"
          onClick={() =>
            openModal(<AdditionalServiceModal onRefetch={onSubmit} serviceData={data} />)
          }
        >
          <Plus />
        </Button>
      </div>
      <div className="">
        {additionalServices.length > 0 && (
          <>
            {additionalServices.map((service) => (
              <div
                key={service.categoryId}
                className="flex justify-between items-center pt-3"
              >
                <p className="font-bold text-sm">{service.category.name}</p>
                <div className="flex gap-4 items-center">
                  <p className="text-gray-200 text-sm">
                    {formattedPrice(service.category.basePrice)}
                  </p>
                  <Icon variant="delete" />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </TicketLayout>
  );
}

export function AdditionalServiceSkeleton() {
  return (
    <TicketLayout className="min-w-md">
      <div className="flex justify-between items-center">
        <p className="text-xs font-bold text-gray-400">Serviços adicionais</p>
        <Button size={"4xs"} className="flex items-center justify-center">
          <Plus />
        </Button>
      </div>
      <div className="">
        <Skeleton width={280} height={40} />
      </div>
    </TicketLayout>
  );
}
