import {
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from "@chakra-ui/react";
import { Download, Info, MoreVertical } from "lucide-react";
import AboutModal from "./AboutModal";

interface OptionsMenuProps {
    archive: {
        onSubmit: () => void;
        isDisabled: boolean;
    };
    export: {
        onSubmit: () => void;
    };
}

const OptionsMenu = (props: OptionsMenuProps): JSX.Element => {
    const aboutDisclosure = useDisclosure();

    return (
        <>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<MoreVertical strokeWidth={2} size={24} />}
                    size="md"
                    color="gray"
                />
                <MenuList>
                    <MenuItem
                        icon={<Icon as={Info} />}
                        onClick={aboutDisclosure.onOpen}
                    >
                        About
                    </MenuItem>
                    <MenuItem
                        icon={<Icon as={Download} />}
                        onClick={props.export.onSubmit}
                        isDisabled
                    >
                        Export data (coming soon)
                    </MenuItem>
                </MenuList>
            </Menu>
            <AboutModal disclosure={aboutDisclosure} />
        </>
    );
};

export default OptionsMenu;
