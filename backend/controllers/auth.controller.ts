import { Request, Response, NextFunction, RequestHandler } from "express";
import AuthService from "../services/auth.service";

class AuthController {
	/**
	 * Login the user
	 * @param req
	 * @param res
	 */
	static login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).send("Email and password are required");
		}
		if (typeof email !== "string" || typeof password !== "string") {
			return res.status(400).send("Email and password must be strings");
		}
		try {
			const user = await AuthService.login(email, password);

			return res.status(200).json(user)
		} catch (error: any) {
			const message = error?.message || "Login failed";
			const code = error?.statusCode || 500;
			return res.status(code).json({ message });
		}
	}

	static register: RequestHandler = async (req: Request, res: Response): Promise<any> => {
		const { email, password, firstName, lastName } = req.body;
		if (!email || !password) {
			return res.status(400).send("Email and password are required");
		}
		if (typeof email !== "string" || typeof password !== "string") {
			return res.status(400).send("Email and password must be strings");
		}
		if (!firstName || !lastName) {
			return res.status(400).send("First name and last name are required");
		}
		if (typeof firstName !== "string" || typeof lastName !== "string") {
			return res.status(400).send("First name and last name must be strings");
		}
		if (firstName.length < 2 || lastName.length < 2) {
			return res.status(400).send("First name and last name must be at least 2 characters long");
		}
		try {
			const user = await AuthService.register(email, password, firstName, lastName);
			return res.status(201).json(user);
		} catch (error: any) {
			const message = error?.message || "Registration failed";
			const code = error?.statusCode || 500;
			return res.status(code).json({ message });
		}
	}

	static refreshToken: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		const refreshToken = req.body.refreshToken;
		if (!refreshToken) {
			return res.status(400).send("Refresh token is required");
		}
		if (typeof refreshToken !== "string") {
			return res.status(400).send("Refresh token must be a string");
		}
		try {
			const user = await AuthService.refreshToken(refreshToken);
			return res.status(200).json(user);
		} catch (error: any) {
			const message = error?.message || "Refresh token failed";
			const code = error?.statusCode || 500;
			return res.status(code).json({ message });
		}
	}

	static resetPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		res.send("Reset password");
	}

	static forgotPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		res.send("Forgot password");
	}

	static changePassword: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		res.send("Change password");
	}

	static updateProfile: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		res.send("Update profile");
	}

	static deleteAccount: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		res.send("Delete account");
	}

	static getProfile: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		try {
			const authHeader = req.headers.authorization;
			if (!authHeader || !authHeader.startsWith('Bearer ')) {
				return res.status(401).json({ message: 'Access token is required' });
			}

			const token = authHeader.split(' ')[1];
			const user = await AuthService.getProfile(token);

			return res.status(200).json({ user });
		} catch (error: any) {
			const message = error?.message || "Failed to retrieve profile";
			const code = error?.statusCode || 500;
			return res.status(code).json({ message });
		}
	}

}

export default AuthController;