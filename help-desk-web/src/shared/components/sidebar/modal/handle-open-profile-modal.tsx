import { useAuth } from "../../../context/auth-context";
import { useModal } from "../../modal/hooks/useModalContext";
import { EditProfileModal } from "./components/edit-profile-modal";

export function useHandleOpenProfileModal() {
  const { openModal, closeModal } = useModal();
  const { user } = useAuth();

  const openHandleOpenProfileModal = () => {
    if (user) {
      openModal(<EditProfileModal user={user} onClose={closeModal} />);
    }
  };
  return { openHandleOpenProfileModal };
}
