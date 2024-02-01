import {
    Box,
    Flex,
    Image,
    ListItem,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import Logo from "./dfci-logo.jpg";

const LandingDisplay = (): JSX.Element => {
    return (
        <Flex
            direction="column"
            gap="2"
            justifyContent="center"
            alignItems="center"
            data-testid="landing-display"
        >
            <Image src={Logo} alt="DFCI Logo" height="12" />
            <Text fontSize="2xl" fontWeight="semibold">
                GPT4DFCI
            </Text>
            <Box
                paddingX="3"
                paddingY="2.5"
                rounded="lg"
                shadow="sm"
                fontSize="sm"
                color="gray.900"
                backgroundColor="gray.100"
                border="1px"
                borderColor="gray.300"
            >
                Welcome to GPT4DFCI, the DFCI instance of GPT. You may use PHI
                and PII in here provided:
                <UnorderedList
                    marginLeft="4"
                    marginTop="1"
                    maxWidth="md"
                    gap="2"
                    textColor="gray.600"
                >
                    <ListItem>Some condition</ListItem>
                    <ListItem>Some condition</ListItem>
                </UnorderedList>
            </Box>
        </Flex>
    );
};

export default LandingDisplay;
