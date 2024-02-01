import { Conversation, ConversationMetadata, Message, User } from "@/models";
import { StorageService } from "@/services/StorageService";

export class MockStorageService implements StorageService {
    user: User;
    storage: Conversation[];

    constructor(user: User) {
        this.user = user;
        this.storage = [];
    }

    async getConvos() {
        console.log(`getConvos`);
        console.log(this.storage);
        return this.storage;
    }
    async createConvo(convo: ConversationMetadata) {
        const withMessages = { messages: [], ...convo };

        this.storage.push(withMessages);
        console.log(`createConvo`);
        console.log(this.storage);
        return convo;
    }
    async updateConvo(convo: ConversationMetadata) {
        const index = this.storage.findIndex((item) => item.id === convo.id);
        const storedConvo = this.storage[index];

        const updatedConvo = { ...storedConvo, ...convo };

        this.storage[index] = updatedConvo;

        console.log(`updateConvo: ${convo.id}`);
        console.log(this.storage);
    }
    async archiveConvo(convoId: Conversation["id"]) {
        const index = this.storage.findIndex((item) => item.id === convoId);

        this.storage[index].isArchived = true;

        console.log(`archiveConvo: ${convoId}`);
        console.log(this.storage);
    }
    async getMessages(convoId: Conversation["id"]) {
        const index = this.storage.findIndex((item) => item.id === convoId);

        console.log(`getMessages: ${convoId}`);
        console.log(this.storage[index].messages);

        return this.storage[index].messages;
    }
    async addMessages(convoId: Conversation["id"], messages: Message[]) {
        const index = this.storage.findIndex((item) => item.id === convoId);

        console.log(`addMessages: ${convoId}`);

        this.storage[index].messages.concat(messages);
        console.log(this.storage[index].messages);

        return this.storage[index].messages;
    }
    async archiveAllConvos() {
        this.storage.forEach((item) => {
            item.isArchived = true;
        });

        console.log(`archiveAllConvos`);
        console.log(this.storage);
    }
}
