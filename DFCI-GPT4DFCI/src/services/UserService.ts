import { User } from "@/models";

export interface UserService {
    getUser(): Promise<User>;
}

export class AADUserService implements UserService {
    async getUser(): Promise<User> {
        const getUserData = (response: any) => {
            const data = response[0];

            let claims = data["user_claims"];

            // reformat
            claims = claims.reduce((result: any, claim: any) => {
                result[claim["typ"]] = claim["val"];

                return result;
            }, {});

            const user = {
                token: data["access_token"],
                displayName: claims["name"],
                email: claims["preferred_username"],
            };

            return user;
        };
        // https://learn.microsoft.com/en-us/azure/app-service/configure-authentication-user-identities#access-user-claims-using-the-api
        const response = fetch("/.auth/me")
            .then((response) => response.json())
            .then(getUserData);

        return response;
    }
}
