import { useEffect, useState } from "react";
import { Button } from "../../../../../shared/components/button";
import { Input } from "../../../../../shared/components/input";
import { ModalContent } from "../../../../../shared/components/modal/modal-content";
import { ModalHeader } from "../../../../../shared/components/modal/modal-header";
import { ModalLayout } from "../../../../../shared/components/modal/modal-layout";
import { getInitials } from "../../../../../shared/utils/get-initial-name";
import { api } from "../../../../../shared/lib/api";
import { Form } from "../../../../../shared/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editUserSchema,
  type editUserSchemaData,
} from "../../../../../shared/schemas/auth/edit-user";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

type EditCLientModalProps = {
  id: number;
  onClose: () => void;
  onEdited?: () => void;
};

type clientResponseType = {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  profilePicture: string;
};

export function EditClientModal({
  id,
  onClose,
  onEdited,
}: EditCLientModalProps) {
  const [data, setData] = useState<clientResponseType | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<editUserSchemaData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: { username: data?.username, email: data?.email },
  });

  useEffect(() => {
    async function fetchClient() {
      try {
        const response = await api.get(`/clients/${id}`);
        const data = await response.data.client;
        setData(data);
        reset({
          username: data.username,
          email: data.email,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchClient();
  }, [id, reset, onClose]);

  const usernameError = errors.username?.message;
  const emailError = errors.email?.message;

  async function editUser(data: any) {
    try {
      const response = await api.put(`/clients/${id}`, data);
      console.log(response.data);
      onEdited?.();
      toast.success("Usuário editado com sucesso!");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Falha ao editar usuário.");
    }
  }

  return (
    <ModalLayout className="">
      <ModalHeader>Cliente</ModalHeader>
      <ModalContent>
        <Form className="w-sm space-y-4" onSubmit={handleSubmit(editUser)}>
          <div className="rounded-full p-2 bg-blue-dark size-12 text-gray-600 text-lg flex items-center justify-center">
            {loading ? (
              <Skeleton circle height={48} width={48} />
            ) : (
              <span className="text-gray-600 text-lg">
                {getInitials(data?.username ?? "")}
              </span>
            )}
          </div>
          {loading ? (
            <div className="space-y-4">
              <Skeleton height={40} />
              <Skeleton height={40} />
            </div>
          ) : (
            <>
              <Input
                legend="NOME"
                className="font-bold"
                {...register("username")}
                isError={!!usernameError}
                helperText={usernameError}
              />
              <Input
                legend="E-MAIL"
                className="font-bold"
                {...register("email")}
                isError={!!emailError}
                helperText={emailError}
              />
            </>
          )}
          <Button size={"5xl"}>Salvar</Button>
        </Form>
      </ModalContent>
    </ModalLayout>
  );
}
