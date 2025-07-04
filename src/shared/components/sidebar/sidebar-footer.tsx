import { useState } from "react";
import { SidebarModal } from "./modal/sidebar-modal";

type SidebarFooterProps = {
  userName: string;
  userEmail: string;
};

export function SidebarFooter({ userName, userEmail }: SidebarFooterProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <div
      className="md:w-full md:p-4 pt-2 md:hover:bg-gray-200 
    md:border-t-1 md:border-t-gray-300 cursor-pointer"
      onClick={() => setProfileOpen((e) => !e)}
    >
      <div className="flex gap-2 p-6 md:p-0 items-center justify-center ">
        <div className="relative bg-blue-dark text-lg rounded-full w-12 h-12 text-white flex items-center justify-center">
          UA
          {profileOpen && (
            <div className="absolute z-50 top-20 right-1 md:top-auto md:right-auto md:bottom-1 md:left-50">
              <SidebarModal modalTitle="OPÇÕES" width="profile" />
            </div>
          )}
        </div>
        <div className="hidden md:flex flex-col">
          <p className="text-sm font-semibold text-white">{userName}</p>
          <p className="text-xs text-gray-400">{userEmail}</p>
        </div>
      </div>
    </div>
  );
}
