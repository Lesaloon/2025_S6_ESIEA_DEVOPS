import { Business } from "./Business";
import { Review } from "./Review";

export type User = {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: "user" | "admin";
    businesses?: Business[];
    reviews?: Review[];
};
