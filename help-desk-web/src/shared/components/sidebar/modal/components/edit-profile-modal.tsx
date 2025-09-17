import { getInitials } from "../../../../utils/get-initial-name";
import { useModal } from "../../../modal/hooks/useModalContext";
import { ModalContent } from "../../../modal/modal-content";
import { ProfileContent } from "../../../table/table-cell";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../context/auth-context";
import { EditPasswordModal } from "./edit-password-modal";
import { ModalHeader } from "../../../modal/modal-header";
import { ModalLayout } from "../../../modal/modal-layout";
import { ModalFooter } from "../../../modal/modal-footer";
import { zodResolver } from "@hookform/resolvers/zod";
import Skeleton from "react-loading-skeleton";
import { Trash, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../../../button";
import { Input } from "../../../input";
import { api } from "../../../../lib/api";
import { Form } from "../../../form";
import { toast } from "react-toastify";
import {
  editUserSchema,
  type editUserSchemaData,
} from "../../../../schemas/auth/edit-user";

type EditProfileModalProps = {
  onClose?: () => void;
  user: TechProps;
};

type TechProps = {
  id: number;
  username: string;
  email: string;
  profilePicture?: string;
  role: string;
  workHours?: {
    workTime: string[];
  };
};

export function EditProfileModal({ onClose, user }: EditProfileModalProps) {
  const { isLoading, setUser } = useAuth();
  const [tech, setTech] = useState<TechProps>();
  const { openModal } = useModal();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    setSelectedFile(e.target.files[0]);
  }

  function removeImagePreview() {
    setImagePreview(null);
    setSelectedFile(null);
  }

  if (isLoading) {
    return (
      <ModalLayout>
        <ModalHeader>Perfil</ModalHeader>
        <div className="w-96 h-96 p-6">
          <div className="flex">
            <Skeleton circle width={40} height={40} />
            <Skeleton width={120} height={40} />
          </div>
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <div></div>
        </div>
      </ModalLayout>
    );
  }

  if (!user) {
    return null;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<editUserSchemaData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
      });
    }
  }, [user, reset]);

  const isTech = user.role === "TECH";
  const usernameError = errors.username?.message;
  const emailError = errors.email?.message;

  async function editUser(data: editUserSchemaData) {
    const formData = new FormData();

    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }

    formData.append("username", data.username);
    formData.append("email", data.email);
    try {
      const response = await api.put(`/clients/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(response.data);
      toast.success("Usuário editado com sucesso!");
      onClose?.();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao tentar editar usuário!");
    }
  }

  useEffect(() => {
    async function WorkHoursArray() {
      try {
        const response = await api.get(`/techs/${user.id}`);
        setTech(response.data.techs);
      } catch (error) {
        console.log(error);
      }
    }
    WorkHoursArray();
  }, []);

  function TechnicianWorkHours() {
    return (
      <div>
        <p className="font-bold text-md">Disponibilidade</p>
        <p className="text-sm">Horários de atendimento definidos pelo admin</p>
        <div className="flex gap-1 pt-3">
          {tech?.workHours?.workTime.map((t, i) => (
            <p
              className="w-full text-left cursor-pointer select-none rounded-2xl border border-gray-500 text-gray-400 font-bold flex items-center justify-center py-1 text-sm"
              key={i}
            >
              {t}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ModalLayout>
      <ModalHeader>Perfil</ModalHeader>
      <Form onSubmit={handleSubmit(editUser)}>
        <ModalContent>
          <span className="flex gap-4">
            <div className=" flex items-center justify-center border-black">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview da imagem"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <ProfileContent
                  className="w-16 h-16"
                  hasAbbreviation={getInitials(user.username)}
                />
              )}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="file"
                className="hidden"
                accept=".jpeg, .jpg, .png, .webp"
                ref={fileInputRef}
                onChange={handleImageChange}
              />

              <label
                htmlFor="file"
                className="cursor-pointer bg-gray-500 text-black px-3 py-2 rounded-lg hover:bg-gray-400 "
              >
                <Upload
                  width={16}
                  height={16}
                  className="inline mr-2 font-bold"
                />
                Nova imagem
              </label>

              {imagePreview && (
                <button
                  onClick={removeImagePreview}
                  className="px-3 py-3 items-center justify-center p-4 rounded-lg text-red-600 bg-gray-500 hover:bg-gray-400 hover:text-red-700"
                >
                  <Trash height={16} width={16} />
                </button>
              )}
            </div>
          </span>
        </ModalContent>

        <ModalContent>
          <Input
            legend="NOME"
            className="font-bold"
            {...register("username")}
            isError={!!usernameError}
            helperText={usernameError}
            type="text"
          />

          <Input
            legend="E-MAIL"
            className="font-bold"
            {...register("email")}
            isError={!!emailError}
            helperText={emailError}
            type="email"
          />

          <div className="flex justify-between items-center">
            <Input
              legend="SENHA"
              placeholder="********"
              className="font-bold"
              type="password"
              disabled
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="font-bold"
              onClick={() =>
                openModal(<EditPasswordModal closeModal={onClose} />)
              }
            >
              Alterar
            </Button>
          </div>
          {isTech && <TechnicianWorkHours />}
        </ModalContent>
        <ModalFooter>
          {isSubmitting ? (
            <Button disabled size={"5xl"}>
              Salvando...
            </Button>
          ) : (
            <Button size={"5xl"}>Salvar</Button>
          )}
        </ModalFooter>
      </Form>
    </ModalLayout>
  );
}
