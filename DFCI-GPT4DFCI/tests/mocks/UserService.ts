import { User } from "@/models";
import { UserService } from "@/services/UserService";

export class MockUserService implements UserService {
    getUser(): Promise<User> {
        const user: User = {
            token: "abcdef",
            displayName: "xxx",
            email: "xxx@DFCI.HARVARD.EDU",
        };

        const msToSleep = 0;
        return new Promise((resolve) => setTimeout(resolve, msToSleep)).then(
            () => user
        );
    }
}

export class UserServiceWithDelay implements UserService {
    getUser(): Promise<User> {
        const user: User = {
            token: "",
            displayName: "xxx",
            email: "xxx@DFCI.HARVARD.EDU",
        };

        const msToSleep = 1000;
        return new Promise((resolve) => setTimeout(resolve, msToSleep)).then(
            () => user
        );
    }
}

export class UserServiceWithError implements UserService {
    getUser(): Promise<User> {
        return new Promise((_, reject) => reject("Error fetching user."));
    }
}
