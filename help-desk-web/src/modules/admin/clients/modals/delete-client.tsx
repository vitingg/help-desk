import { toast } from "react-toastify";
import { Button } from "../../../../shared/components/button";
import { useModal } from "../../../../shared/components/modal/hooks/useModalContext";
import { ModalContent } from "../../../../shared/components/modal/modal-content";
import { ModalFooter } from "../../../../shared/components/modal/modal-footer";
import { ModalHeader } from "../../../../shared/components/modal/modal-header";
import { ModalLayout } from "../../../../shared/components/modal/modal-layout";
import { api } from "../../../../shared/lib/api";

export function useDeleteCliente({ onDeleted }: { onDeleted?: () => void }) {
  const { openModal, closeModal } = useModal();

  const handleOpenDeleteModal = (id: number, username: string) => {
    const handleDeleteCliente = async () => {
      try {
        await api.delete(`/clients/${id}`);
        closeModal();
        onDeleted?.();
        toast.success("Cliente deletado com sucesso!");
      } catch (error) {
        console.log(error);
        toast.error("Falha ao deletar cliente!");
      }
    };

    openModal(
      <ModalLayout>
        <ModalHeader>Excluir cliente</ModalHeader>
        <ModalContent>
          <div className="w-md space-y-3">
            <h1 className="text-md">
              Deseja realmente excluir
              <strong className="font-bold"> {username}?</strong>
            </h1>
            <h2 className="text-md">
              Ao excluir, todos os chamados deste cliente serão removidos e esta
              ação não poderá ser desfeita.
            </h2>
          </div>
        </ModalContent>
        <ModalFooter>
          <div className="flex justify-center gap-2 items-center">
            <Button
              size={"4xl"}
              onClick={closeModal}
              variant={"secondary"}
              className=""
            >
              Cancelar
            </Button>
            <Button size={"4xl"} onClick={handleDeleteCliente}>
              Sim, excluir
            </Button>
          </div>
        </ModalFooter>
      </ModalLayout>
    );
  };

  return { handleOpenDeleteModal };
}
