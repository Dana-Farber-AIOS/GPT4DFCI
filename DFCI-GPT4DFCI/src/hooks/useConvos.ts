import { ConversationMetadata } from "@/models";
import { useState } from "react";

/** Hook for editing "convos" state */
const useConvos = () => {
    const [convos, setConvos] = useState<ConversationMetadata[]>([]);

    const createConvo = (convo: ConversationMetadata) => {
        setConvos([...convos, convo]);
    };

    const editTitle = (convo: ConversationMetadata, title: string) => {
        const index = convos.findIndex((c) => c.id === convo.id);

        const edited = [...convos];
        edited[index].title = title;

        setConvos(edited);
    };

    const archiveConvo = (convo: ConversationMetadata) => {
        setConvos(convos.filter((_convo) => _convo.id !== convo.id));
    };

    const archiveAllConvos = () => {
        setConvos([]);
    };

    return {
        convos,
        createConvo,
        editTitle,
        archiveConvo,
        archiveAllConvos,
        setConvos,
    };
};

export default useConvos;
