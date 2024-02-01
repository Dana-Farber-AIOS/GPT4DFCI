import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    UseDisclosureReturn,
} from "@chakra-ui/react";
import { RefObject } from "react";

interface ConfirmationDialogProps {
    disclosure: UseDisclosureReturn;
    cancelRef: RefObject<HTMLButtonElement>;
    onSubmit: () => void;
    header: React.ReactNode;
    body: React.ReactNode;
    submitText: string;
}

const ConfirmationDialog = ({
    disclosure,
    cancelRef,
    onSubmit,
    header,
    body,
    submitText,
}: ConfirmationDialogProps): JSX.Element => (
    <AlertDialog
        isOpen={disclosure.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={disclosure.onClose}
    >
        <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {header}
                </AlertDialogHeader>

                <AlertDialogBody>{body}</AlertDialogBody>

                <AlertDialogFooter>
                    <Button
                        ref={cancelRef}
                        onClick={disclosure.onClose}
                        shadow="sm"
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={() => {
                            onSubmit();
                            disclosure.onClose();
                        }}
                        ml="3"
                        shadow="sm"
                    >
                        {submitText}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
);

export default ConfirmationDialog;
