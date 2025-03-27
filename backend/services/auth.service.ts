import { User, UserAttributes, UserCreationAttributes } from "../model/user.model";
import DAOFactory from "../dao/DAOFactory";
import crypto from "crypto";
import jwt from 'jsonwebtoken';

class AuthService {
	private static userDAO = DAOFactory.getDAO(User);
	/**
	 * Login the user
	 * steps :
	 * 1. check if user exists
	 * 2. check if password is correct
	 * 3. generate access token and refresh token
	 * @param email user email
	 * @param password user password (not hashed yet)
	 * @returns user object with tokens
	 */
	static async login(email: string, password: string) {
		const user = await this.userDAO.findOne({ email });
		if (!user) {
			throw Object.assign(new Error("User not found"), { statusCode: 404 });
		}
		// check if password is correct
		const testpass = await crypto.hash("sha512", password)
		if (user.password != testpass) {
			throw Object.assign(new Error("Invalid password"), { statusCode: 401 });
		}

		const accessToken = this.generateAccessToken(user);
		const refreshToken = this.generateRefreshToken(user);
		const userData = user.toJSON() as UserCreationAttributes;
		userData.password = ""; // remove the password from the user object
		return { userData, accessToken, refreshToken };
	}

	/**
	 * Register the user
	 * steps :
	 * 1. check if user exists
	 * 2. check the password strength
	 * 3. create the user (the password is hashed in the model)
	 * 4. generate access token and refresh token
	 * @param email user email
	 * @param password user password (not hashed yet)
	 * @param firstName user first name
	 * @param lastName user last name
	 * @returns user object with tokens
	 */
	static async register(email: string, password: string, firstName: string, lastName: string) {
		try {
			const user = await this.userDAO.findOne({ email });
			if (user) {
				throw Object.assign(new Error("User already exists"), { statusCode: 400 });
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				throw Object.assign(new Error("Invalid email format"), { statusCode: 400 });
			}

			if (password.length < 8) {
				throw Object.assign(new Error("Password must be at least 8 characters long"), { statusCode: 400 });
			}
			if (!/[A-Z]/.test(password)) {
				throw Object.assign(new Error("Password must contain at least one uppercase letter"), { statusCode: 400 });
			}

			const userData = {
				email,
				password,
				firstName,
				lastName,
			} as UserCreationAttributes;

			const newUser = await this.userDAO.create(userData);
			const accessToken = this.generateAccessToken(newUser);
			const refreshToken = this.generateRefreshToken(newUser);

			const userDataResponse = newUser.toJSON() as UserCreationAttributes;
			userDataResponse.password = "";

			return { userData: userDataResponse, accessToken, refreshToken };
		} catch (error) {
			throw Object.assign(error instanceof Error ? error : new Error("Unknown registration error"), {
				statusCode: (error as any).statusCode || 500,
			});
		}
	}

	/**
	 * Generate the JWT access token
	 * @param user user object
	 * @returns JWT access token
	 */
	private static generateAccessToken(user: User) {
		return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME!, 10) });
	}

	/**
	 * Generate the JWT refresh token
	 * @param user user object
	 * @returns JWT refresh token
	 */
	private static generateRefreshToken(user: User) {
		return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
	}

	/**
	 * Refresh the access token using the refresh token
	 * @param refreshToken refresh token
	 * @returns new access token and refresh token
	 */
	static async refreshToken(refreshToken: string) {
		if (!refreshToken) {
			throw new Error("Refresh token not found");
		}
		const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as User;
		const newAccessToken = this.generateAccessToken(user);
		const newRefreshToken = this.generateRefreshToken(user);
		return { newAccessToken, newRefreshToken };
	}

	static async getProfile(token: string) {
		if (!token) {
			throw new Error("Token not found");
		}
		const user = jwt.verify(token, process.env.JWT_SECRET!) as User;
		const userDAO = await this.userDAO.findOne({ id: user.id });
		if (!userDAO) {
			throw Object.assign(new Error("User not found"), { statusCode: 404 });
		}
		return userDAO;
	}
}

export default AuthService;