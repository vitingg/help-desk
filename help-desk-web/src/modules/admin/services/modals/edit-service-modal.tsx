import { type createCategorySchemaData } from "../../../../shared/schemas/categories/create-categories";
import { useModal } from "../../../../shared/components/modal/hooks/useModalContext";
import { EditServiceForm } from "../components/edit-service";

type editServiceModal = {
  onSubmit: (data: createCategorySchemaData, id: number) => void;
};

export function useEditServiceModal({ onSubmit }: editServiceModal) {
  const { openModal, closeModal } = useModal();

  const handleEditModal = (id: number) => {
    openModal(
      <EditServiceForm id={id} onSubmit={onSubmit} closeModal={closeModal} />
    );
  };

  return { handleEditModal };
}
