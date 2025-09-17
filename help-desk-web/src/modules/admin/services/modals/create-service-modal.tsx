import { useForm } from "react-hook-form";
import {
  createCategorySchema,
  type createCategorySchemaData,
} from "../../../../shared/schemas/categories/create-categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "../../../../shared/components/modal/hooks/useModalContext";
import { ModalLayout } from "../../../../shared/components/modal/modal-layout";
import { ModalContent } from "../../../../shared/components/modal/modal-content";
import { ModalHeader } from "../../../../shared/components/modal/modal-header";
import { Input } from "../../../../shared/components/input";
import { Form } from "../../../../shared/components/form";
import { Button } from "../../../../shared/components/button";
import { toast } from "react-toastify";

export function useCreateServiceModal({
  onSubmit,
}: {
  onSubmit: (data: createCategorySchemaData) => void;
}) {
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createCategorySchemaData>({
    resolver: zodResolver(createCategorySchema),
  });

  async function createService(formData: createCategorySchemaData) {
    try {
      onSubmit(formData);
      toast.success("Serviço criado com sucesso!");
      reset();
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar serviço!");
    }
  }

  const titleError = errors.name?.message;
  const basePriceError = errors.basePrice?.message;

  const handleCreateModal = () => {
    openModal(
      <ModalLayout>
        <ModalHeader>Serviço</ModalHeader>
        <ModalContent>
          <Form onSubmit={handleSubmit(createService)} className="space-y-4">
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
                isError={!!basePriceError}
                helperText={basePriceError}
              />
            </div>
            <Button size={"5xl"} className="font-medium mt-7">
              Salvar
            </Button>
          </Form>
        </ModalContent>
      </ModalLayout>
    );
  };

  return { handleCreateModal };
}
