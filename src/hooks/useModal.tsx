import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ButtonProps } from "@chakra-ui/button/dist/button";

type ModalButton = ButtonProps;

type ModalOptions = {
  buttons?: ModalButton[];
};

interface ModalMetadata {
  modalTitle: string;
  modalContent: string;
  modalOptions?: ModalOptions;
}

const modalContext = React.createContext<{
  Modal: React.FC;
  callModal: (title: string, content: string, options?: ModalOptions) => void;
}>({
  Modal: () => null,
  callModal: (title: string, content: string) => {},
});

export const useModal = () => React.useContext(modalContext);

export const ProvideModal = ({ children }: { children: any }) => {
  const modalCtx = useProvideModal();
  return (
    <modalContext.Provider value={modalCtx}>{children}</modalContext.Provider>
  );
};

function useProvideModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalMeta, setModalMeta] = React.useState<ModalMetadata>({
    modalTitle: "",
    modalContent: "",
  });

  const callModal = (
    title: string,
    content: string,
    options?: ModalOptions,
  ) => {
    setModalMeta({
      modalTitle: title,
      modalContent: content,
      modalOptions: options,
    });
  };

  useEffect(() => {
    if (modalMeta.modalTitle !== "") {
      onOpen();
    }
  }, [modalMeta]);

  const modal = () => (
    <Modal onClose={onClose} isOpen={isOpen} isCentered autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalMeta.modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody whiteSpace={"pre-wrap"}>{modalMeta.modalContent}</ModalBody>
        <ModalFooter columnGap={"0.75rem"}>
          {modalMeta.modalOptions?.buttons?.map(({ ...buttonProps }, index) => (
            <Button
              key={index}
              {...buttonProps}
              onClick={(event) => {
                buttonProps.onClick?.(event);
                onClose();
              }}
            />
          ))}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return {
    Modal: modal,
    callModal,
  };
}
