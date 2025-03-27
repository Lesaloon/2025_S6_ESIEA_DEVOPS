import { UserAttributes } from '../model/user.model';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import AuthService from '../services/auth.service';
import { Business } from '../model/business.model';
import { Review } from '../model/review.model';

describe('AuthService', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should call login', async () => {
		expect.assertions(2);
		const mockResponse = {
			userData : {
				id: 1,
				email: "jhondoe@test.com",
				firstName: 'John',
				lastName: 'Doe',
				role: "user",
				password: "",
				businesses: [] as Business[],
				reviews: [] as Review[],
			} as UserAttributes,
			accessToken: "access_token",
			refreshToken: "refresh_token"
		};
		const loginSpy = jest.spyOn(AuthService, 'login').mockResolvedValue(mockResponse);

		const result = await AuthService.login(mockResponse.userData.email, "password");

		expect(loginSpy).toHaveBeenCalledWith(mockResponse.userData.email, "password");
		expect(result).toEqual(mockResponse);

	});

	it('should call register', async () => {
		expect.assertions(2);
		const mockResponse = {
			userData : {
				id: 1,
				email: "jhondoe@test.com",
				firstName: 'John',
				lastName: 'Doe',
				role: "user",
				password: "",
				businesses: [] as Business[],
				reviews: [] as Review[],
			} as UserAttributes,
			accessToken: "access_token",
			refreshToken: "refresh_token"
		};
		const registerSpy = jest.spyOn(AuthService, 'register').mockResolvedValue(mockResponse);

		const result = await AuthService.register(mockResponse.userData.email, "password", mockResponse.userData.firstName, mockResponse.userData.lastName);

		expect(registerSpy).toHaveBeenCalledWith(mockResponse.userData.email, "password", mockResponse.userData.firstName, mockResponse.userData.lastName);
		expect(result).toEqual(mockResponse);
	});
});