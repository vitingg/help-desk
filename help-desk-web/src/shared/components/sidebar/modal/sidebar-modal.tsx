import { type ReactNode } from "react";
import { CircleUser, LogOut } from "lucide-react";
import { useHandleOpenProfileModal } from "./handle-open-profile-modal";
import { useHandleLeaveAccount } from "./handle-leave-account-modal";

type SidebarModal = {
  modalTitle: "OPÇÕES" | "MENU";
  children?: ReactNode;
  profile?: boolean;
  width: "profile" | "sidebar";
};

const widthClasses = {
  profile: "w-full md:w-[12rem]",
  sidebar: "w-full inset-0",
};

export function SidebarModal({ modalTitle, children, width }: SidebarModal) {
  const { openHandleLeaveAccount } = useHandleLeaveAccount();
  const { openHandleOpenProfileModal } = useHandleOpenProfileModal();

  return (
    <div
      className={`bg-gray-100 text-gray-600 rounded-xl ${widthClasses[width]}`}
    >
      <p className="text-2xs text-gray-400 font-bold pt-4 pl-5 md:pb-4">
        {modalTitle}
      </p>
      {modalTitle === "OPÇÕES" && (
        <div className="p-5 pt-2 flex flex-col gap-3 ">
          <div
            className="flex gap-2 items-center hover:opacity-80"
            onClick={openHandleOpenProfileModal}
          >
            <CircleUser width={20} /> Perfil
          </div>
          <div
            className="flex gap-2 items-center text-feedback-danger hover:opacity-80 "
            onClick={openHandleLeaveAccount}
          >
            <LogOut width={20} /> Sair
          </div>
        </div>
      )}

      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}
