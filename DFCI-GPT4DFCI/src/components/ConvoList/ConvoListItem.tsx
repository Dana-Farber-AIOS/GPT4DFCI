import { ConversationMetadata } from "@/models";
import {
    Badge,
    ButtonGroup,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    IconButton,
    Input,
    Text,
    useDisclosure,
    useEditableControls,
} from "@chakra-ui/react";
import { Archive, Check, Edit3, X } from "lucide-react";
import { useRef } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { modelColorScheme } from "@/models";

interface ConvoListItemProps {
    convo: ConversationMetadata;
    isActive: boolean;
    onSelect: (conversation: ConversationMetadata) => void;
    onEdit: (conversation: ConversationMetadata, title: string) => void;
    onArchive: (conversation: ConversationMetadata) => void;
}

const backgroundColor = "gray.200";
const iconSize = "16";
const iconStrokeWidth = "2";

const ConvoListItem = ({
    convo,
    isActive,
    onSelect,
    onEdit,
    onArchive,
}: ConvoListItemProps): JSX.Element => {
    const archiveDisclosure = useDisclosure();
    const archiveDisclosureRef = useRef(null);

    const EditableControls = (): JSX.Element => {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();

        const Buttons = isEditing ? (
            <>
                <IconButton
                    icon={
                        <Check size={iconSize} strokeWidth={iconStrokeWidth} />
                    }
                    color="gray"
                    aria-label="submit-edit"
                    {...getSubmitButtonProps()}
                />
                <IconButton
                    icon={<X size={iconSize} strokeWidth={iconStrokeWidth} />}
                    color="gray"
                    aria-label="cancel-edit"
                    {...getCancelButtonProps()}
                />
            </>
        ) : (
            <>
                <IconButton
                    icon={
                        <Edit3 size={iconSize} strokeWidth={iconStrokeWidth} />
                    }
                    color="gray"
                    aria-label="edit-title"
                    {...getEditButtonProps()}
                />
                <IconButton
                    icon={
                        <Archive
                            size={iconSize}
                            strokeWidth={iconStrokeWidth}
                        />
                    }
                    color="gray"
                    onClick={archiveDisclosure.onOpen}
                    aria-label="archive-convo"
                />
            </>
        );

        return (
            <ButtonGroup size="sm" variant="ghost" gap="0">
                {Buttons}
            </ButtonGroup>
        );
    };
    return (
        <>
            <Editable
                defaultValue={convo.title}
                isPreviewFocusable={false}
                onClick={() => onSelect(convo)}
                tabIndex={0}
                width="full"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap="2"
                paddingX="3.5"
                paddingY="2"
                rounded="md"
                cursor="pointer"
                backgroundColor={isActive ? backgroundColor : ""}
                _hover={{
                    backgroundColor: backgroundColor,
                }}
                onSubmit={(title) => onEdit(convo, title)}
                role="listitem"
            >
                <Flex direction="column" maxWidth="48">
                    <Input as={EditableInput} size="sm" fontWeight="semibold" />
                    <EditablePreview
                        fontFamily="heading"
                        fontWeight="semibold"
                        fontSize="sm"
                        cursor="pointer"
                        noOfLines={1}
                    />
                    <Text
                        color="gray.600"
                        fontSize="xs"
                        marginTop="-1"
                        marginBottom="1"
                    >
                        {convo.timestamp.toDateString()}
                    </Text>
                    <Badge
                        colorScheme={modelColorScheme(convo.model)}
                        width="max-content"
                        fontSize="2xs"
                        variant="solid"
                    >
                        {convo.model}
                    </Badge>
                </Flex>
                <EditableControls />
            </Editable>
            <ConfirmationDialog
                cancelRef={archiveDisclosureRef}
                disclosure={archiveDisclosure}
                onSubmit={() => onArchive(convo)}
                header={<>Archive Conversation</>}
                body={
                    <>
                        Are you sure you want to archive{" "}
                        <Text as="span" fontWeight="semibold">
                            "{convo.title}"
                        </Text>
                        ? This action cannot be undone.
                    </>
                }
                submitText="Archive"
            />
        </>
    );
};

export default ConvoListItem;
