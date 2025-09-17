import { useNavigate } from "react-router";
import { Input } from "../../../../shared/components/input";
import { api } from "../../../../shared/lib/api";
import { Form } from "../../../../shared/components/form";
import { signUpSchema } from "../../../../shared/schemas/auth/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import type { signUpSchemaData } from "../../../../shared/types/auth/sign-up";
import { useForm } from "react-hook-form";
import { Button } from "../../../../shared/components/button";
import { WorkHoursSelector } from "../components/work-hours-selector";
import { HeaderAction } from "../../../../shared/components/header-action";
import { useState } from "react";
import { toast } from "react-toastify";

export function CreateTechForm() {
  const [workHours, setWorkHours] = useState<string[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signUpSchemaData>({
    resolver: zodResolver(signUpSchema),
  });

  const usernameError = errors.username?.message;
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  async function createTech(data: signUpSchemaData) {
    const payload = {
      ...data,
      workHours: workHours,
    };

    try {
      await api.post("/techs", payload);
      toast.success("Técnico criado com sucesso!");
      reset();
      navigate("/dashboard/admin/techs");
    } catch (error) {
      toast.error("Erro ao criar técnico!");
      console.log(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit(createTech)}>
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
            <div className="flex items-center justify-center">
              <div className="pt-4 space-y-5 w-full">
                <Input
                  legend="Nome"
                  {...register("username")}
                  placeholder="Insira seu nome"
                  isError={!!usernameError}
                  helperText={usernameError}
                />
                <Input
                  legend="E-mail"
                  {...register("email")}
                  placeholder="Insira seu email"
                  isError={!!emailError}
                  helperText={emailError}
                />
                <Input
                  legend="Senha"
                  {...register("password")}
                  placeholder="Insira sua senha"
                  isError={!!passwordError}
                  helperText={passwordError}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <WorkHoursSelector
            onSelectionChange={(hours) => {
              console.log("Horas recebidas:", hours);
              setWorkHours(hours);
            }}
          />
        </div>
      </div>
    </Form>
  );
}
