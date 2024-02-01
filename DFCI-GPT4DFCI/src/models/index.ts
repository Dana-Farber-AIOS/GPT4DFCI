export interface User {
    token: string;
    displayName: string;
    email: string;
}

export interface Message {
    id: string;
    conversationId: string;
    sender: Sender;
    text: string;
    timestamp: Date;
    status: MessageStatus;
    statusMessage?: string;
}

export enum MessageStatus {
    Success = "success",
    Error = "error",
}

export interface Conversation {
    id: string;
    messages: Message[];
    title: string;
    timestamp: Date;
    isArchived: boolean;
    model: GPTModel;
}

export type ConversationMetadata = Omit<Conversation, "messages">;

export enum Sender {
    User = "user",
    Assistant = "assistant",
}

export enum GPTModel {
    GPT35Turbo = "gpt-3.5-turbo",
    GPT4 = "gpt-4",
    GPT4turbo = "gpt-4-turbo",
}

export const DEFAULT_MODEL = GPTModel.GPT35Turbo;

export const modelColorScheme = (model: GPTModel) => {
    switch (model) {
        case GPTModel.GPT35Turbo:
            return "green";
        case GPTModel.GPT4:
            return "blue";
        case GPTModel.GPT4turbo:
            return "blue";
        default:
            return "gray";
    }
};

export const modelDeployment = (model: GPTModel) => {
    switch (model) {
        case GPTModel.GPT35Turbo:
            return "gpt-35-turbo-0613";
        case GPTModel.GPT4:
            return "gpt-4model";
        case GPTModel.GPT4turbo:
            return "gpt-4tmodel";
            
            default:
            return "";
    }
};
