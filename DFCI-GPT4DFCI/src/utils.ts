// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Newable<T> = { new (...args: any[]): T };

export const throwResponseError = <T>(response: Response) => {
    if (!response.ok) {
        throw new Error(
            `${response.statusText} (status: ${response.status}, type: ${response.type})`
        );
    }
    return response.json() as Promise<T>;
};
