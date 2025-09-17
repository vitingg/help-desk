import { useEffect } from "react";
import { Button } from "../../../../shared/components/button";
import { Form } from "../../../../shared/components/form";
import { Input } from "../../../../shared/components/input";
import { ModalContent } from "../../../../shared/components/modal/modal-content";
import { ModalHeader } from "../../../../shared/components/modal/modal-header";
import { ModalLayout } from "../../../../shared/components/modal/modal-layout";
import {
  createCategorySchema,
  type createCategorySchemaData,
} from "../../../../shared/schemas/categories/create-categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../shared/lib/api";

type EditServiceFormProps = {
  id: number;
  onSubmit: (data: createCategorySchemaData, id: number) => void;
  closeModal: () => void;
};

type CategoryWithRelations = {
  name: string;
  basePrice: number;
};

type CategoryResponse = { category: CategoryWithRelations };

export function EditServiceForm({
  closeModal,
  id,
  onSubmit,
}: EditServiceFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createCategorySchemaData>({
    resolver: zodResolver(createCategorySchema),
  });

  const nameError = errors.name?.message;
  const basePriceError = errors.basePrice?.message;

  useEffect(() => {
    async function getService() {
      try {
        const response = await api.get<CategoryResponse>(`/categories/${id}`);
        const data = response.data.category;
        reset({
          name: data.name,
          basePrice: data.basePrice,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getService();
  }, [id, reset]);

  function onEditService(formData: createCategorySchemaData) {
    onSubmit(formData, id);
    closeModal();
  }

  return (
    <ModalLayout>
      <ModalHeader>Serviço</ModalHeader>
      <ModalContent>
        <Form onSubmit={handleSubmit(onEditService)} className="space-y-4">
          <Input
            legend="TÍTULO"
            className="font-bold"
            {...register("name")}
            isError={!!nameError}
            helperText={nameError}
          />
          <div className="relative">
            <p className="absolute top-4 font-bold">R$</p>
            <Input
              legend="VALOR"
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
}
