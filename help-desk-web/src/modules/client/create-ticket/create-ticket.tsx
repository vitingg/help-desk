import { Paragraph } from "../../../shared/components/tickets/components/paragraph";
import { CardBox } from "../../../shared/components/tickets/components/card-box";
import { TextArea } from "../../../shared/components/text-area";
import { Select } from "../../../shared/components/select";
import { Button } from "../../../shared/components/button";
import { Input } from "../../../shared/components/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../shared/components/form";
import { api } from "../../../shared/lib/api";
import { useEffect, useState } from "react";
import {
  createTicketSchema,
  type createTicketSchemaData,
} from "../../../shared/schemas/service/create-service";
import { useNavigate } from "react-router";
import { useAuth } from "../../../shared/context/auth-context";

type Category = {
  id: number;
  name: string;
  basePrice: number;
};

export function CreateTicket() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<createTicketSchemaData>({
    resolver: zodResolver(createTicketSchema),
  });

  const titleError = errors.title?.message;
  const descriptionError = errors.description?.message;

  const watchedCategoryId = watch("baseCategoryId");

  const selectedCategory = categories.find(
    (cat) => String(cat.id) === String(watchedCategoryId)
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get("/categories/available-categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
      }
    }
    fetchCategories();
  }, []);

  const categoryOptions = categories.map((cat) => ({
    value: String(cat.id),
    label: `${cat.name}`,
  }));

  async function createService(data: createTicketSchemaData) {
    try {
      const createService = await api.post("/services", {
        title: data.title,
        description: data.description,
        baseCategoryId: Number(watchedCategoryId),
        clientId: user?.id,
      });

      navigate("/dashboard/client/tickets");

      console.log(createService.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="pt-14">
          <span>
            <p className="text-blue-dark font-semibold text-xl">Novo chamado</p>
          </span>
          <Form
            onSubmit={handleSubmit(createService)}
            className="pt-6 flex gap-4 flex-col md:flex-row items-start"
          >
            <div className="border p-8 rounded-2xl border-gray-500 w-full md:w-[32rem]">
              <CardBox className="pt-6">
                <Paragraph size="md">Informações</Paragraph>
                <Paragraph size="xs">
                  Configure os dias e horários em que você está disponível para
                  atender chamados
                </Paragraph>
              </CardBox>
              <div className="space-y-2">
                <Input
                  legend="TÍTULO"
                  placeholder="Digite um título"
                  {...register("title")}
                  isError={!!titleError}
                  helperText={titleError}
                />
                <TextArea
                  legend="Descrição"
                  placeholder="Escreva sua descrição..."
                  {...register("description")}
                  isError={!!descriptionError}
                  helperText={descriptionError}
                />
                <CardBox className="space-y-1">
                  <p className="uppercase text-2xs text-gray-300">
                    Categoria de serviço
                  </p>
                  <Controller
                    control={control}
                    name="baseCategoryId"
                    render={({ field }) => (
                      <Select
                        placeholder="Selecione a categoria de atendimento"
                        options={categoryOptions}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.baseCategoryId && (
                    <p className="text-red-500 text-xs">
                      {errors.baseCategoryId.message}
                    </p>
                  )}
                </CardBox>
              </div>
            </div>
            <div className="border p-8 rounded-2xl border-gray-500 w-full md:w-[20rem]">
              <CardBox>
                <Paragraph size="md">Resumo</Paragraph>
                <Paragraph size="xs" className="text-gray-300">
                  Valores e detalhes
                </Paragraph>
              </CardBox>
              <CardBox>
                <Paragraph size="xs">Categoria de serviço</Paragraph>
                <Paragraph size="sm">
                  {selectedCategory
                    ? selectedCategory.name
                    : "Nenhuma selecionada"}
                </Paragraph>
              </CardBox>
              <CardBox className="pb-0">
                <Paragraph size="xs">Custo inicial</Paragraph>
                <span className="text-gray-200 font-bold text-xs flex items-baseline-last gap-1">
                  R${" "}
                  <p className="text-lg font-bold">
                    {selectedCategory ? selectedCategory.basePrice : 0}
                  </p>
                </span>
              </CardBox>
              <Paragraph size="xs" className="py-6">
                O chamado será automaticamente atribuído a um técnico disponível
              </Paragraph>
              <Button size={"4xl"}>Criar chamado</Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
