import { Message, MessageStatus, Sender } from "@/models";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { AlertCircle } from "lucide-react";

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps): JSX.Element => {
    return (
        <Flex width="full" flexDirection="column">
            <Flex width="full" justify="space-between">
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                    {message.sender}
                </Text>
                <Text fontSize="xs" color="gray.500">
                    {message.timestamp.toLocaleString()}
                </Text>
            </Flex>
            <Flex
                paddingX="3"
                paddingY="2.5"
                borderRadius="lg"
                borderWidth="thin"
                borderColor="gray.300"
                boxShadow="sm"
                backgroundColor={
                    message.sender === Sender.User ? "gray.100" : "white"
                }
                justifyContent="space-between"
                alignItems="center"
                gap={2}
            >
                <Text whiteSpace="pre-wrap" wordBreak="normal">
                    {message.text}
                </Text>
            </Flex>
            <Flex
                marginTop={1}
                gap={1}
                display={
                    message.status === MessageStatus.Error ? "flex" : "none"
                }
                alignItems="end"
            >
                <Icon as={AlertCircle} color="red" />
                <Text as="span" fontSize="xs" color="slategray" isTruncated>
                    {message.statusMessage}
                </Text>
            </Flex>
        </Flex>
    );
};

export default MessageBubble;
