import { InMemoryUserRepository } from "../user/InMemoryUserRepository";
import { LoginUseCase } from "../user/LoginUseCase";
import { UserRepository } from "../user/UserRepository";

type LoginInput = {
    email: string;
    password: string;
};

type LoginOutput = {
    id: string;
    name: string;
    email: string;
    isChild: boolean;
};

interface IAuthService {
    readonly repository: UserRepository
    login(input: LoginInput): Promise<LoginOutput | null>
}


export class AuthService implements IAuthService {
    constructor(
        readonly repository: UserRepository,
    ) { }

    async login(input: LoginInput): Promise<LoginOutput | null> {
        try {
            const usecase = new LoginUseCase(this.repository);

            const output = await usecase.execute(input);

            if (!output) return null;

            return {
                id: String(output.id),
                email: output.email,
                name: output.name,
                isChild: output.isChild,
            }
        } catch {
            return null;
        }
    }
}

export const authService = new AuthService(new InMemoryUserRepository());