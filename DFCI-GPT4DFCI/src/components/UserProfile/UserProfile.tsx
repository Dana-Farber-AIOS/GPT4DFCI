import { User } from "@/models";
import { Avatar, Flex, Text } from "@chakra-ui/react";

interface UserSettingsProps {
    user?: User;
}

const UserSettings = ({ user }: UserSettingsProps): JSX.Element => {
    return (
        <Flex
            width="full"
            overflow="hidden"
            whiteSpace="nowrap"
            alignItems="center"
            gap="3"
            paddingX="2"
            paddingBottom="1"
        >
            <Avatar name={user && `${user.displayName}`} size="sm" />
            <Flex width="full" maxWidth="56" direction="column">
                <Text fontWeight="semibold" fontSize="medium" isTruncated>
                    {user ? `${user?.displayName}` : "Loading user..."}
                </Text>
                <Text fontSize="xs" textColor="gray.500" mt="-0.5" isTruncated>
                    {user?.email}
                </Text>
            </Flex>
        </Flex>
    );
};

export default UserSettings;
