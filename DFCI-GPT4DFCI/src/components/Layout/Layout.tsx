import { Box, Flex } from "@chakra-ui/react";

interface LayoutProps {
    Sidebar: React.ReactNode;
    Content: React.ReactNode;
    Footer: React.ReactNode;
}

const Layout = ({ Sidebar, Content, Footer }: LayoutProps): JSX.Element => {
    return (
        <Flex height="100vh" width="full">
            <Box
                height="full"
                display={{ base: "none", md: "block" }}
                width="md"
            >
                {Sidebar}
            </Box>
            <Flex
                height="full"
                width="full"
                direction="column"
                overflowY="auto"
                paddingX="8"
                paddingTop="8"
            >
                <Box
                    flexDirection="column"
                    flexGrow="1"
                    alignItems="center"
                    justifyContent="center"
                >
                    {Content}
                </Box>
                <Flex
                    width="full"
                    position="sticky"
                    direction="column"
                    bottom="0"
                >
                    <Box
                        width="full"
                        height="4"
                        bgGradient="linear(to-t, rgba(255, 255, 255), rgba(255, 255, 255, 0))"
                    />
                    <Flex
                        width="full"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="white"
                        paddingTop="4"
                        paddingBottom="6"
                    >
                        {Footer}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Layout;
