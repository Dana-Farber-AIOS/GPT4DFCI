import { Message } from "@/models";
import { throwResponseError } from "@/utils";

export interface GetCompletionRequest {
    messages: Message[];
    deployment_name: string;
}

export interface AssistantService {
    getCompletion(request: GetCompletionRequest): Promise<Message["text"]>;
}

export class OpenAIAssistantService implements AssistantService {
    async getCompletion(request: GetCompletionRequest): Promise<string> {
        const endpoint = `${GPT4DFCI_API_ENDPOINT}?deployment_name=${request.deployment_name}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": ${OCP_APIM_SUBSCRIPTION_KEY},
            },
            body: JSON.stringify(request.messages),
        };
        return fetch(endpoint, options)
            .then(
                throwResponseError<{
                    choices: { message: { content: string } }[];
                }>
            )
            .then((response) => {
                return response.choices[0].message.content;
            });
    }
}
