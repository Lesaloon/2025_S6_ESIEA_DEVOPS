export type User = {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
};
