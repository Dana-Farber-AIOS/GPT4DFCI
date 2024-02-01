import { ConversationMetadata } from "@/models";
import ConvoListItem from "./ConvoListItem";
import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface ConvoListProps {
    convos: ConversationMetadata[];
    activeConvo: ConversationMetadata;
    onSelect: (convo: ConversationMetadata) => void;
    onEdit: (convo: ConversationMetadata, newTitle: string) => void;
    onArchive: (convo: ConversationMetadata) => void;
}

const ConvoList = ({
    convos,
    activeConvo,
    onSelect,
    onEdit,
    onArchive,
}: ConvoListProps): JSX.Element => {
    const isActive = (convo: ConversationMetadata) =>
        activeConvo !== undefined && convo.id === activeConvo.id;
    return (
        <Flex direction="column" gap="2" width="full" data-testid="convo-list">
            {convos
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map((convo) => (
                    <Box
                        as={motion.div}
                        key={convo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                    >
                        <ConvoListItem
                            convo={convo}
                            onSelect={onSelect}
                            onEdit={onEdit}
                            onArchive={onArchive}
                            isActive={isActive(convo)}
                        />
                    </Box>
                ))}
        </Flex>
    );
};

export default ConvoList;
