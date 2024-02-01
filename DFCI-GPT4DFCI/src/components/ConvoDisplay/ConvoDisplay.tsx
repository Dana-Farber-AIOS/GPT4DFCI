import useAutoScrollToBottom from "@/hooks/useAutoScrollToBottom";
import { Conversation } from "@/models";
import { Box, Flex } from "@chakra-ui/react";
import MessageBubble from "@/components/MessageBubble";
import { motion } from "framer-motion";

interface ConvoDisplayProps {
    convo: Conversation;
}

const ConvoDisplay = ({ convo }: ConvoDisplayProps): JSX.Element => {
    // automatically scroll to bottom on new message
    const endOfMessages = useAutoScrollToBottom([convo.messages.length]);
    return (
        <Flex direction="column" gap="4">
            {convo.messages.map((message) => (
                <Box
                    as={motion.div}
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    width="full"
                >
                    <MessageBubble message={message} />
                </Box>
            ))}
            <div ref={endOfMessages} />
        </Flex>
    );
};

export default ConvoDisplay;
