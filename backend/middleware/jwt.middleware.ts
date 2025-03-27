import { expressjwt } from "express-jwt";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const jwtMiddleware = expressjwt({
    secret: process.env.JWT_SECRET || "your_jwt_secret",
    algorithms: ['HS256'],
    requestProperty: "user",
    credentialsRequired: true,
}).unless({
    path: ["/auth/login", "/auth/register", "/"] // Define paths to bypass authentication
});