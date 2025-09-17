import { ModalContent } from "../../../modal/modal-content";
import { ModalHeader } from "../../../modal/modal-header";
import { ModalLayout } from "../../../modal/modal-layout";
import { Input } from "../../../input";
import { Button } from "../../../button";
import { ModalFooter } from "../../../modal/modal-footer";
import { Form } from "../../../form";
import { useForm } from "react-hook-form";
import {
  editPasswordSchema,
  type editPasswordSchemaData,
} from "../../../../schemas/auth/change-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../lib/api";
import { toast } from "react-toastify";

type EditPasswordModalProps = {
  closeModal: (() => void) | undefined;
};

export function EditPasswordModal({ closeModal }: EditPasswordModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<editPasswordSchemaData>({
    resolver: zodResolver(editPasswordSchema),
  });

  const newPasswordError = errors.newPassword?.message;
  const oldPasswordError = errors.password?.message;

  async function editPassword(data: editPasswordSchemaData) {
    try {
      await api.put("/change-password", {
        oldPassword: data.password,
        newPassword: data.newPassword,
      });
      reset();
      closeModal?.();
      toast.success("Senha alterada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.success("Falha ao alterar senha!");
    }
  }

  return (
    <ModalLayout>
      <ModalHeader>Alterar Senha</ModalHeader>

      <Form onSubmit={handleSubmit(editPassword)}>
        <ModalContent>
          <Input
            legend="SENHA ATUAL"
            placeholder="Digite sua senha atual"
            className="font-bold"
            type="password"
            {...register("password")}
            isError={!!oldPasswordError}
            helperText={oldPasswordError}
          />

          <Input
            legend="NOVA SENHA"
            placeholder="Digite sua nova senha"
            className="font-bold"
            type="password"
            {...register("newPassword")}
            isError={!!newPasswordError}
            helperText={newPasswordError}
          />
        </ModalContent>

        <ModalFooter>
          <Button size={"5xl"} type="submit">
            Salvar
          </Button>
        </ModalFooter>
      </Form>
    </ModalLayout>
  );
}
