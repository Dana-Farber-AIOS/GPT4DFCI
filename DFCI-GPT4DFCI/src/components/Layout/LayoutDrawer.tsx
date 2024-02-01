import {
    Box,
    BoxProps,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { Menu } from "lucide-react";
import { useRef } from "react";

const LayoutDrawer = ({ children, ...props }: BoxProps): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const buttonRef = useRef(null);

    return (
        <Box {...props}>
            <IconButton
                ref={buttonRef}
                onClick={onOpen}
                icon={<Menu />}
                aria-label="menu-toggle"
                variant="ghost"
            />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={buttonRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    {children}
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default LayoutDrawer;
