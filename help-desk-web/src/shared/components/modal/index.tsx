import { Input } from "../input";
import { ModalContent } from "./modal-content";
import { ModalFooter } from "./modal-footer";
import { ModalHeader } from "./modal-header";
import { ModalLayout } from "./modal-layout";

export function Modal() {
  return (
    <ModalLayout open={true} onClose={() => {}}>
      <ModalHeader> Cadastro de serviço</ModalHeader>
      <ModalContent>
        <Input legend="TÍTULO" placeholder="Nome do serviço" />
        <div className="relative">
          <p className="absolute top-4 font-bold">R$</p>
          <Input legend="VALOR" placeholder="0,00" className="pl-6" />
        </div>{" "}
      </ModalContent>
      <ModalFooter>Salvar</ModalFooter>
    </ModalLayout>
  );
}
