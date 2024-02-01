import {
    Conversation,
    ConversationMetadata,
    DEFAULT_MODEL,
    GPTModel,
    MessageStatus,
    Sender,
    User,
    modelDeployment,
} from "@/models";
import { useEffect, useState } from "react";
import { AssistantService } from "@/services/AssistantService";
import { StorageService } from "@/services/StorageService";
import { UserService } from "@/services/UserService";
import { Newable } from "@/utils";
import useConvos from "./useConvos";

const defaultConvo = (model: GPTModel = DEFAULT_MODEL) => {
    return {
        /** id and timestamp are placeholders,
         * backend will generate these */
        id: crypto.randomUUID(),
        title: "",
        timestamp: new Date(),
        model: model,
        messages: [],
        isArchived: false,
    };
};

const useAPI = (
    UserService: Newable<UserService>,
    AssistantService: Newable<AssistantService>,
    StorageService: Newable<StorageService>
) => {
    const assistantService = new AssistantService();

    const [user, setUser] = useState<User>();
    const [storageService, setStorageService] = useState<StorageService>();

    const { convos, ...convoState } = useConvos();
    const [activeConvo, setActiveConvo] = useState<Conversation>(
        defaultConvo()
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [model, setModel] = useState<GPTModel>(DEFAULT_MODEL);

    /** Load conversations from storage */
    useEffect(() => {
        const userService = new UserService();
        const loadConversations = async () => {
            setIsLoading(true);
            await userService
                .getUser()
                .then((user) => {
                    setUser(user);

                    const storageService = new StorageService(user);

                    setStorageService(storageService);
                    return storageService;
                })
                .then((storageService) => storageService.getConvos())
                .then(convoState.setConvos);
            setIsLoading(false);
        };

        loadConversations();
    }, [UserService, StorageService]);

    /** Make sure convos state is updated
     * so new title appears in the sidebar list.
     */
    useEffect(() => {
        const updatedConvos = convos.map((convo) =>
            convo.id === activeConvo.id ? activeConvo : convo
        );
        convoState.setConvos(updatedConvos);
    }, [activeConvo.title]);

    const selectModel = (model: GPTModel) => {
        activeConvo.model = model;
        setActiveConvo(activeConvo);
        setModel(model);
    };

    const selectConvo = (convo: ConversationMetadata) => {
        storageService?.getMessages(convo.id).then((messages) => {
            const newActiveConvo = { messages: messages, ...convo };
            setActiveConvo(newActiveConvo);
        });
    };

    /** Create empty conversation, without adding to list. */
    const createConvo = () => {
        setModel(model);
        setActiveConvo(defaultConvo(model));
    };

    /** Edit conversation title. */
    const editConvo = (
        convo: ConversationMetadata,
        title: Conversation["title"]
    ) => {
        storageService?.updateConvo(convo);
        convoState.editTitle(convo, title);
    };

    /** Archive single conversation. */
    const archiveConvo = (convo: ConversationMetadata) => {
        storageService?.archiveConvo(convo.id);
        convoState.archiveConvo(convo);
        createConvo();
    };

    /** Archive all conversations. */
    const archiveAllConvos = () => {
        storageService?.archiveAllConvos();
        convoState.archiveAllConvos();
        createConvo();
    };

    /** On submit for prompt input. */
    const onSubmit = async (text: string) => {
        /** Check if user is defined */
        if (!user) {
            throw Error("User is not defined.");
        }

        if (!storageService) {
            throw Error("Storage service not defined.");
        }

        /** If conversation is new, add to list. */
        if (!convos.some((convo) => convo.id === activeConvo.id)) {
            /** Use first message for default title.
             * Original ChatGPT behavior is to generate a title -
             * may want to update to this in the future.
             */
            const truncate = (text: string) => {
                const MAX_LENGTH = 20;

                if (text.length > MAX_LENGTH) {
                    return text.substring(0, MAX_LENGTH) + "...";
                } else {
                    return text;
                }
            };
            activeConvo.title = truncate(text);

            convoState.createConvo(activeConvo);
            const createdConvo = await storageService.createConvo(activeConvo);

            activeConvo.id = createdConvo.id;

            setActiveConvo({ ...activeConvo });
        }

        if (!isSubmitting) {
            setIsSubmitting(true);

            const userMessage = {
                id: crypto.randomUUID(),
                conversationId: activeConvo.id,
                text: text,
                sender: Sender.User,
                timestamp: new Date(),
                status: MessageStatus.Success,
            };

            storageService?.addMessages(activeConvo.id, [userMessage]);
            activeConvo.messages.push(userMessage);

            const completion = await assistantService
                .getCompletion({
                    messages: activeConvo.messages,
                    deployment_name: modelDeployment(model),
                })
                .catch((error) => {
                    const latestMessage = activeConvo.messages.at(-1);
                    if (latestMessage) {
                        latestMessage.status = MessageStatus.Error;
                        latestMessage.statusMessage = error.message;
                    }
                });

            if (completion) {
                const assistantMessage = {
                    id: crypto.randomUUID(),
                    conversationId: activeConvo.id,
                    text: completion,
                    sender: Sender.Assistant,
                    timestamp: new Date(),
                    status: MessageStatus.Success,
                };

                activeConvo.messages.push(assistantMessage);
                storageService?.addMessages(activeConvo.id, [assistantMessage]);
            }

            setIsSubmitting(false);
        }
    };

    return {
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
    };
};

export default useAPI;
