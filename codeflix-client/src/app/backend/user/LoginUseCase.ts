import { UserRepository } from "@/backend/user/UserRepository";
import { InvalidCredentials } from "@/backend/user/exceptions";

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

async function simulatePasswordHashValidation(plain: string, hash: string): Promise<boolean> {
    await new Promise((response) => setTimeout(response, 50));
    return hash === `hashed:${plain}`;
}

export class LoginUseCase {
    constructor(readonly repository: UserRepository) { }

    async execute(input: LoginInput): Promise<LoginOutput | null> {
        try {
            const user = this.repository.findByEmail(input.email);

            const isPasswordValid = await simulatePasswordHashValidation(input.password, user.passwordHash);

            if (!isPasswordValid) {
                throw new InvalidCredentials();
            }

            return {
                id: String(user.id),
                name: user.name,
                email: user.email,
                isChild: user.isChild,
            };
        } catch (error: unknown) {
            return null;
        }
    }
}