import { User } from "@/backend/user/User";

export interface UserRepository {
    findByEmail(email: string): User;
}