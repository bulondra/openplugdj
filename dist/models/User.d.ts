export type UserRole = "listener" | "dj" | "admin";
export interface User {
    id: string;
    username: string;
    role: UserRole;
    joinedAt: number;
}
