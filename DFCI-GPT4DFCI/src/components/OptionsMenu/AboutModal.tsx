import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    UseDisclosureReturn,
} from "@chakra-ui/react";

interface AboutModalProps {
    disclosure: UseDisclosureReturn;
}

const AboutModal = ({ disclosure }: AboutModalProps): JSX.Element => {
    const { isOpen, onClose } = disclosure;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">About GPT4DFCI</ModalHeader>
                <ModalCloseButton />
                <ModalBody>(Content goes here.)</ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AboutModal;
