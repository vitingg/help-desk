import { ModalContent } from "../../../shared/components/modal/modal-content";
import { ModalFooter } from "../../../shared/components/modal/modal-footer";
import { ModalHeader } from "../../../shared/components/modal/modal-header";
import { ModalLayout } from "../../../shared/components/modal/modal-layout";
import { Button } from "../../../shared/components/button";
import { Input } from "../../../shared/components/input";
import { Form } from "../../../shared/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "../../../shared/lib/api";
import {
  createCategorySchema,
  type createCategorySchemaData,
} from "../../../shared/schemas/categories/create-categories";
import type { Ticket } from "../../../shared/types/tickets/ticket-response";

interface TicketDetailProps {
  serviceData: Ticket;
  onRefetch?: () => void;
}

export function AdditionalServiceModal({
  serviceData,
  onRefetch,
}: TicketDetailProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createCategorySchemaData>({
    resolver: zodResolver(createCategorySchema),
  });

  async function onSubmit(data: createCategorySchemaData) {
    try {
      const response = await api.post("/categories", {
        name: data.name,
        basePrice: data.basePrice,
      });
      const dataId = response.data.id;
      await api.patch(`/services/${serviceData.id}/additional-categories`, {
        additionalCategoryIds: [dataId],
      });

      reset();
      onRefetch?.();
    } catch (error) {
      console.log(error);
    }
  }

  const titleError = errors.name?.message;
  const basePrice = errors.basePrice?.message;

  return (
    <ModalLayout>
      <ModalHeader>Serviço adicional</ModalHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <Input
            legend="TÍTULO"
            placeholder="Nome do serviço"
            className="font-bold"
            {...register("name")}
            isError={!!titleError}
            helperText={titleError}
          />
          <div className="relative">
            <p className="absolute top-4 font-bold">R$</p>
            <Input
              legend="VALOR"
              placeholder="0,00"
              className="pl-6 font-bold"
              type="number"
              {...register("basePrice", { valueAsNumber: true })}
              isError={!!basePrice}
              helperText={basePrice}
            />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button size={"5xl"}>Salvar</Button>
        </ModalFooter>
      </Form>
    </ModalLayout>
  );
}
