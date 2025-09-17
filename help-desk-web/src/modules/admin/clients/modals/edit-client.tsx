import { useModal } from "../../../../shared/components/modal/hooks/useModalContext";
import { EditClientModal } from "./components/edit-client-modal";



export function useEditClient({ onEdited }: { onEdited?: () => void }) {
  const { openModal, closeModal } = useModal();

  const handleOpenEditModal = (id: number) => {
    openModal(<EditClientModal id={id} onClose={closeModal} onEdited={onEdited} />);
  };

  return { handleOpenEditModal };
}
