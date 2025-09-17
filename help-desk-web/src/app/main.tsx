import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../shared/styles/index.css";
import { App } from "./App.tsx";
import { ModalProvider } from "../shared/components/modal/context/modal-context.tsx";
import { AuthProvider } from "../shared/context/auth-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthProvider>
  </StrictMode>
);
