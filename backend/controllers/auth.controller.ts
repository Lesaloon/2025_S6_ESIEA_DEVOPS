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
		} catch (error) {
			if (error instanceof Error) {
				return res.status(401).send(error.message);
			}
			return res.status(500).send("Internal server error");
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
			const user = AuthService.register(email, password, firstName, lastName);
			return res.status(201).json(user);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).send(error.message);
			}
			return res.status(500).send("Internal server error");
		}
	}

	static refreshToken(req: Request, res: Response) {
		res.send("Refresh token");
	}

	static resetPassword(req: Request, res: Response) {
		res.send("Reset password");
	}

	static forgotPassword(req: Request, res: Response) {
		res.send("Forgot password");
	}

	static changePassword(req: Request, res: Response) {
		res.send("Change password");
	}

	static updateProfile(req: Request, res: Response) {
		res.send("Update profile");
	}

	static deleteAccount(req: Request, res: Response) {
		res.send("Delete account");
	}

}

export default AuthController;