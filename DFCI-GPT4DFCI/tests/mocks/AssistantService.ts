import {
    AssistantService,
    GetCompletionRequest,
} from "@/services/AssistantService";

export class MockAssistantService implements AssistantService {
    getCompletion(request: GetCompletionRequest) {
        if (request.messages.length <= 0) {
            throw Error("Request must include at least one message.");
        }

        const response = `This is a response to a chat with ${request.messages.length} messages.`;
        const msToSleep = 1000;
        return new Promise((resolve) => setTimeout(resolve, msToSleep)).then(
            () => response
        );
    }
}

export class MockAssistantServiceError implements AssistantService {
    getCompletion(request: GetCompletionRequest) {
        if (request.messages.length <= 0) {
            throw Error("Request must include at least one message.");
        }

        const msToSleep = 1000;
        return new Promise((resolve) => setTimeout(resolve, msToSleep)).then(
            () => {
                throw Error("This is a fake error.");
            }
        );
    }
}
