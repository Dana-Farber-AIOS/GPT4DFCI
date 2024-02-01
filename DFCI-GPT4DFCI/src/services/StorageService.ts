import { Conversation, ConversationMetadata, Message, User } from "@/models";

export interface StorageService {
    user: User;

    /** Fetch conversations for given user, without messages. */
    getConvos: () => Promise<ConversationMetadata[]>;

    /** Create a conversation in the database from the given object.
     *
     * The created conversation is returned in order to supply the ID
     * generated by the backend.
     */
    createConvo: (convo: ConversationMetadata) => Promise<ConversationMetadata>;

    /** Update the conversation with the given ID with the supplied values. */
    updateConvo: (convo: ConversationMetadata) => Promise<void>;

    /**  Mark the conversation with the given ID as "archived". */
    archiveConvo: (convoId: Conversation["id"]) => Promise<void>;

    /** Mark all the user's conversations as "archived". */
    archiveAllConvos: () => Promise<void>;

    /** Fetch messages for the conversation with the given ID. */
    getMessages: (convoId: Conversation["id"]) => Promise<Message[]>;

    /** Add message */
    addMessages: (
        convoId: Conversation["id"],
        messages: Message[]
    ) => Promise<Message[]>;
}

export class HTTPStorageService implements StorageService {
    user: User;
    endpoint: string;

    constructor(user: User, endpoint: string = `${HTTP_STORAGE_SERVICE_HOST}:${HTTP_STORAGE_SERVICE_PORT}`) {
        this.user = user;
        this.endpoint = endpoint;
    }

    async getConvos() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.user.token}`,
            },
        };

        return fetch(`${this.endpoint}/convos`, options)
            .then((result) => result.json())
            .then((data) => data as ConversationMetadata[]);
    }

    async createConvo(convo: ConversationMetadata) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.user.token}`,
            },
            body: JSON.stringify(convo),
        };

        return fetch(`${this.endpoint}/convos`, options)
            .then((result) => result.json())
            .then((data) => data as ConversationMetadata);
    }

    async updateConvo(convo: ConversationMetadata) {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.user.token}`,
            },
            body: JSON.stringify(convo),
        };

        await fetch(`${this.endpoint}/convos/${convo.id}`, options);
    }

    async archiveConvo(convoId: Conversation["id"]) {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.user.token}`,
            },
            body: JSON.stringify({
                id: convoId,
                isArchived: true,
            }),
        };

        await fetch(`${this.endpoint}/convos/${convoId}`, options);
    }

    async archiveAllConvos() {}

    async getMessages(convoId: Conversation["id"]) {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.user.token}`,
            },
        };

        return fetch(`${this.endpoint}/convos/${convoId}/messages`, options)
            .then((result) => result.json())
            .then((data) => data as Message[]);
    }

    async addMessages(convoId: Conversation["id"], messages: Message[]) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.user.token}`,
            },
            body: JSON.stringify(messages),
        };

        return fetch(`${this.endpoint}/convos/${convoId}/messages`, options)
            .then((result) => result.json())
            .then((data) => data as Message[]);
    }
}
