import { motion } from "framer-motion";
import { Button, Flex } from "@chakra-ui/react";
import ConvoList from "@/components/ConvoList";
import ConvoDisplay from "@/components/ConvoDisplay";
import ExpandableInput from "@/components/ExpandableInput";
import LandingDisplay from "@/components/LandingDisplay";
import Layout from "@/components/Layout";
import ModelSelect from "@/components/ModelSelect";
import OptionsMenu from "@/components/OptionsMenu";
import Sidebar from "@/components/Sidebar";
import UserProfile from "@/components/UserProfile";
import useAPI from "@/hooks/useAPI";
import { GPTModel } from "@/models";
import { Newable } from "@/utils";
import { AADUserService, UserService } from "@/services/UserService";
import { MockUserService } from "../tests/mocks/UserService";
import { MockStorageService } from "../tests/mocks/StorageService";
import {
    AssistantService,
    OpenAIAssistantService,
} from "@/services/AssistantService";

function App() {
    let UserService: Newable<UserService>;
    let AssistantService: Newable<AssistantService>;

    if (import.meta.env.DEV) {
        UserService = MockUserService;
        AssistantService = OpenAIAssistantService;
    } else {
        UserService = AADUserService;
        AssistantService = OpenAIAssistantService;
    }

    const StorageService = MockStorageService;

    const {
        convos,
        activeConvo,
        selectConvo,
        createConvo,
        archiveConvo,
        archiveAllConvos,
        editConvo,
        onSubmit,
        isSubmitting,
        isLoading,
        user,
        model,
        selectModel,
    } = useAPI(UserService, AssistantService, StorageService);

    return (
        <Layout
            Sidebar={
                <Sidebar
                    Header={
                        <Button
                            onClick={createConvo}
                            width="full"
                            colorScheme="messenger"
                            size="md"
                            data-testid="new-conversation-button"
                        >
                            New Conversation
                        </Button>
                    }
                    Body={
                        <ConvoList
                            convos={convos}
                            activeConvo={activeConvo}
                            onSelect={selectConvo}
                            onEdit={editConvo}
                            onArchive={archiveConvo}
                        />
                    }
                    Footer={
                        <Flex>
                            <UserProfile user={user} />
                            <OptionsMenu
                                archive={{
                                    onSubmit: archiveAllConvos,
                                    isDisabled: convos.length === 0,
                                }}
                                export={{
                                    onSubmit: () => {
                                        return;
                                    },
                                }}
                            />
                        </Flex>
                    }
                />
            }
            Content={
                activeConvo.messages.length > 0 ? (
                    <ConvoDisplay convo={activeConvo} />
                ) : (
                    <Flex
                        width="full"
                        height="full"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Flex
                            as={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 0 }}
                            maxWidth="fit-content"
                            direction="column"
                            gap="4"
                        >
                            <LandingDisplay />
                            <ModelSelect
                                value={model}
                                options={Object.values(GPTModel)}
                                onChange={selectModel}
                                size="lg"
                            />
                        </Flex>
                    </Flex>
                )
            }
            Footer={
                <ExpandableInput
                    maxRows={10}
                    placeholder={
                        isLoading
                            ? "Loading conversations..."
                            : ( isSubmitting ? "Generating response" : "Write a prompt.")
                    }
                    isSubmitting={isSubmitting}
                    onSubmit={(event) => onSubmit(event.currentTarget.value)}
                    width="full"
                    paddingX="3"
                    paddingY="2.5"
                    rounded="lg"
                    boxShadow="sm"
                    fontSize="sm"
                    isDisabled={isLoading || isSubmitting}
                    data-testid="prompt-input"
                />
            }
        />
    );
}

export default App;
