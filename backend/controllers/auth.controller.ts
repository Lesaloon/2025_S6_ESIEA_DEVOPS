import { Request, Response } from "express";

class AuthController {

	static login(req: Request, res: Response) {
		res.send("Login user");
	}

	static register(req: Request, res: Response) {
		res.send("Register user");
	}

	static logout(req: Request, res: Response) {
		res.send("Logout user");
	}

	static refreshToken(req: Request, res: Response) {
		res.send("Refresh token");
	}

	static verifyEmail(req: Request, res: Response) {
		res.send("Verify email");
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

	static updateAvatar(req: Request, res: Response) {
		res.send("Update avatar");
	}

	static deleteAccount(req: Request, res: Response) {
		res.send("Delete account");
	}

}

export default AuthController;