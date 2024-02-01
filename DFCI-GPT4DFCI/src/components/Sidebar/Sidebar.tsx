import { Box, Flex } from "@chakra-ui/react";

interface SidebarProps {
    Header: React.ReactNode;
    Body: React.ReactNode;
    Footer: React.ReactNode;
}

const backgroundColor = "gray.100";
const borderColor = "gray.300";
const paddingX = "4";
const paddingY = "4";

const Sidebar = ({ Header, Body, Footer }: SidebarProps): JSX.Element => {
    return (
        <Flex
            direction="column"
            height="full"
            width="full"
            overflowY="auto"
            boxShadow="sm"
            borderRight="1px"
            borderColor={borderColor}
            backgroundColor={backgroundColor}
        >
            <Box position="sticky" top="0" zIndex="50">
                <Box
                    backgroundColor={backgroundColor}
                    paddingX={paddingX}
                    paddingY={paddingY}
                >
                    {Header}
                </Box>
                <Box
                    width="full"
                    height="4"
                    bgGradient={`linear(to-b, ${backgroundColor}, rgba(0, 0, 0, 0))`}
                />
            </Box>
            <Flex flexGrow="1" paddingX={paddingX}>
                {Body}
            </Flex>
            <Box>
                <Box
                    width="full"
                    height="6"
                    bgGradient={`linear(to-t, ${backgroundColor}, rgba(0, 0, 0, 0))`}
                />
                <Box
                    backgroundColor={backgroundColor}
                    paddingX={paddingX}
                    paddingY={paddingY}
                >
                    {Footer}
                </Box>
            </Box>
        </Flex>
    );
};

export default Sidebar;
