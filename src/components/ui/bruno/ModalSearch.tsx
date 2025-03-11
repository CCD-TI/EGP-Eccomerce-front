import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ReactNode } from "react";
import { FaSearch } from "react-icons/fa";

interface ModalSearchProps {
  content: (onClose: () => void) => ReactNode;
}

export default function App({ content }: ModalSearchProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="!bg-none !p-2.5 rounded-full border-1 scale-0 max-lg:scale-100"
      >
        <FaSearch className="text-xl text-white" />{" "}
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="full"
        classNames={{
          base: "bg-white/0",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody>
                <div className="w-full  h-auto mt-10 justify-center flex mx-auto ">
                {content(onClose)}
                </div>
              </ModalBody>
              {/* <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
