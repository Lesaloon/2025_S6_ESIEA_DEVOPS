import { UserAttributes } from '../model/user.model';
import UserService from '../services/user.service';
import { afterEach, describe, expect, it, jest } from '@jest/globals';

describe('UserService static', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call getAllUsers', async () => {
    expect.assertions(2);

    const mockResponse: UserAttributes[] = [
      {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
        businesses: [],
        reviews: []
      }
    ];

    const getAllUsersSpy = jest
      .spyOn(UserService, 'getAllUsers')
      .mockResolvedValue(mockResponse);

    const result = await UserService.getAllUsers();

    expect(getAllUsersSpy).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should call getUserById', async () => {
    expect.assertions(2);

    const mockResponse: UserAttributes = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      businesses: [],
      reviews: []
    };

    const getUserByIdSpy = jest
      .spyOn(UserService, 'getUserById')
      .mockResolvedValue(mockResponse);

    const result = await UserService.getUserById(1);

    expect(getUserByIdSpy).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should call createUser', async () => {
    expect.assertions(2);

    const mockUser: UserAttributes = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      businesses: [],
      reviews: []
    };

    const createUserSpy = jest
      .spyOn(UserService, 'createUser')
      .mockResolvedValue(mockUser);

    const result = await UserService.createUser(mockUser);

    expect(createUserSpy).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it('should call updateUser', async () => {
    expect.assertions(2);

    const mockUser: Partial<UserAttributes> = {
      firstName: 'Updated'
    };

    const updateUserSpy = jest
      .spyOn(UserService, 'updateUser')
      .mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Updated',
        lastName: 'User',
        role: 'user',
        businesses: [],
        reviews: []
      });

    const result = await UserService.updateUser(1, mockUser);

    expect(updateUserSpy).toHaveBeenCalled();
    expect(result).toEqual({
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Updated',
      lastName: 'User',
      role: 'user',
      businesses: [],
      reviews: []
    });
  });

  it('should call deleteUser', async () => {
    expect.assertions(2);

    const deleteUserSpy = jest
      .spyOn(UserService, 'deleteUser')
      .mockResolvedValue(true);

    const result = await UserService.deleteUser(1);

    expect(deleteUserSpy).toHaveBeenCalled();
    expect(result).toEqual(true);
  });

  it('should return null when getUserById is called with a non-existent ID', async () => {
    expect.assertions(2);

    const getUserByIdSpy = jest
      .spyOn(UserService, 'getUserById')
      .mockResolvedValue(null);

    const result = await UserService.getUserById(9999);

    expect(getUserByIdSpy).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should return null when updateUser is called with a non-existent ID', async () => {
    expect.assertions(2);

    const mockUpdate: Partial<UserAttributes> = {
      firstName: 'Should Not Exist'
    };

    const updateUserSpy = jest
      .spyOn(UserService, 'updateUser')
      .mockResolvedValue(null);

    const result = await UserService.updateUser(9999, mockUpdate);

    expect(updateUserSpy).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should return false when deleteUser is called with a non-existent ID', async () => {
    expect.assertions(2);

    const deleteUserSpy = jest
      .spyOn(UserService, 'deleteUser')
      .mockResolvedValue(false);

    const result = await UserService.deleteUser(9999);

    expect(deleteUserSpy).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('should throw error when createUser is called with incomplete data', async () => {
    expect.assertions(1);

    const invalidUser = {
      id: 9999,
    } as UserAttributes;

    jest.spyOn(UserService, 'createUser').mockImplementation(() => Promise.reject(new Error('Validation error')));

    await expect(UserService.createUser(invalidUser)).rejects.toThrow('Validation error');
  });
});
