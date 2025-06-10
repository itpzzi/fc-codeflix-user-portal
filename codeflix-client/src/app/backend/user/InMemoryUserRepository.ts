import { UserRepository } from "@/backend/user/UserRepository";
import { User } from "@/backend/user/User";
import { UserNotFound } from "@/backend/user/exceptions";



function simulateHashPassword(password: string): string {
  return `hashed:${password}`;
}

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [
        new User({
            id: "user-1",
            name: 'Adult User',
            email: 'adult-user@email.com',
            passwordHash: simulateHashPassword('0x12.123456789ABC'),
            isChild: false,
        }),
        new User({
            id: "user-2",
            name: 'Child User',
            email: 'child-user@email.com',
            passwordHash: simulateHashPassword('0x12.123456789ABC'),
            isChild: true,
        })
    ];

    findByEmail(email: string): User {
        const user = this.users.find((user) => user.email === email);
        if (!user) throw new UserNotFound('Usuário não encontrado');
        return user;
    }
}