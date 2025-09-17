import ReactDOM from "react-dom";
import { ModalLayout } from "../modal-layout";
import React, { createContext, useState, type ReactNode } from "react";

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
  isOpen: boolean;
}

interface ModalOptions {
  size?: "sm" | "md" | "lg";
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const openModal = (content: ReactNode, _?: ModalOptions) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setModalContent(null), 300);
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      {isOpen &&
        modalRoot &&
        ReactDOM.createPortal(
          <ModalLayout onClose={closeModal}>{modalContent}</ModalLayout>,
          modalRoot as HTMLElement
        )}
    </ModalContext.Provider>
  );
};
