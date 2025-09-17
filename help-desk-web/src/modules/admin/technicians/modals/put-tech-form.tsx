import { getInitials } from "../../../../shared/utils/get-initial-name";
import { Button } from "../../../../shared/components/button";
import { Input } from "../../../../shared/components/input";
import { useNavigate, useParams } from "react-router";
import { Form } from "../../../../shared/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../shared/lib/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  editUserSchema,
  type editUserSchemaData,
} from "../../../../shared/schemas/auth/edit-user";
import { WorkHoursSelector } from "../components/work-hours-selector";
import { HeaderAction } from "../../../../shared/components/header-action";
import { toast } from "react-toastify";

interface WorkHours {
  id: number;
  techId: number;
  workTime: string[];
}

interface Service {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  clientId: number;
  techId: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | string;
  createdAt: string;
  updatedAt: string;
}

interface Technician {
  createdAt: string;
  email: string;
  id: number;
  profilePicture: string | null;
  role: "TECH";
  servicesAsClient: Service[];
  servicesAsTech: Service[];
  username: string;
  workHours: WorkHours;
}

export function PutTechForm() {
  const { id } = useParams();
  const [data, setData] = useState<Technician | null>(null);
  const [workHours, setWorkHours] = useState<string[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<editUserSchemaData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: { username: data?.username, email: data?.email },
  });

  const usernameError = errors.username?.message;
  const emailError = errors.email?.message;

  useEffect(() => {
    async function getTech() {
      try {
        const response = await api.get(`/techs/${id}`);
        const data = await response.data.techs;
        setData(data);
        reset({
          username: data?.username,
          email: data?.email,
        });
        console.log(data.workHours.workTime);
        if (data.workHours?.workTime) {
          setWorkHours(data.workHours.workTime);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getTech();
  }, [id, reset]);

  async function editUser(data: editUserSchemaData) {
    const payload = {
      ...data,
      workHours: workHours,
    };
    workHours.sort();
    try {
      const response = await api.put(`/techs/${id}`, payload);
      console.log(response.data);
      toast.success("Técnico alterado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao alterar técnico!");
    }
  }

  return (
    <Form onSubmit={handleSubmit(editUser)}>
      <div className="pt-14 md:flex items-center justify-between">
        <HeaderAction title="Perfil do técnico" />
        <div className="gap-2 flex">
          <Button
            variant="secondary"
            className="font-bold w-1/2"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button size="md" className="font-bold w-1/2" type="submit">
            Salvar
          </Button>
        </div>
      </div>
      <div className="flex gap-6 pt-6">
        <div className="border border-gray-500 p-6 rounded-lg">
          <p className="font-bold">Dados pessoais</p>
          <p className="text-gray-300 text-xs pr-4">
            Defina as informações do perfil de técnico
          </p>

          <div className="pt-6">
            <div className="rounded-full p-2 bg-blue-dark size-12 text-gray-600 text-lg flex items-center justify-center">
              {getInitials(data?.username ?? "")}
            </div>

            <div className="flex items-center justify-center">
              <div className="pt-4 space-y-5 w-full">
                <Input
                  legend="Nome"
                  {...register("username")}
                  isError={!!usernameError}
                  helperText={usernameError}
                />
                <Input
                  legend="E-mail"
                  {...register("email")}
                  isError={!!emailError}
                  helperText={emailError}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <WorkHoursSelector
            initialSelectedHours={data?.workHours?.workTime}
            onSelectionChange={(hours) => setWorkHours(hours)}
          />
        </div>
      </div>
    </Form>
  );
}
