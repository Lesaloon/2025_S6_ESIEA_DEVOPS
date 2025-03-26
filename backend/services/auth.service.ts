import { User, UserCreationAttributes } from "../model/user.model";
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
		const user = await this.userDAO.findOne({ where: { email } });
		if (!user) {
			throw new Error("User not found");
		}
		// check if password is correct
		const testpass = await crypto.hash("sha512", password)
		if (user.password != testpass) {
			throw new Error("Invalid password");
		}

		const accessToken = this.generateAccessToken(user);
		const refreshToken = this.generateRefreshToken(user);
		return { user, accessToken, refreshToken };
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
		const user = await this.userDAO.findOne({ where: { email } });
		if (user) {
			throw new Error("User already exists");
		}
		// check if the email is valid
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new Error("Invalid email format");
		}

		// check the password strength
		if (password.length < 8) {
			throw new Error("Password must be at least 8 characters long");
		}
		if (!/[A-Z]/.test(password)) {
			throw new Error("Password must contain at least one uppercase letter");
		}

		// create the user
		const userData = {
			email,
			password,
			firstName,
			lastName,
		} as UserCreationAttributes;
		const newUser = await this.userDAO.create(userData);
		// generate access token and refresh token
		const accessToken = this.generateAccessToken(newUser);
		const refreshToken = this.generateRefreshToken(newUser);
		return { user: newUser, accessToken, refreshToken };
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
}

export default AuthService;