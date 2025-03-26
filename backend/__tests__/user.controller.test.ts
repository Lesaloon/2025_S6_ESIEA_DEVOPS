import request from 'supertest';
import { jest } from '@jest/globals';
import app from '../start';
import UserService from '../services/user.service';
import { UserAttributes } from '../model/user.model';

jest.mock('../services/user.service');

describe('UserController', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all users', async () => {
    (UserService.getAllUsers as jest.MockedFunction<typeof UserService.getAllUsers>).mockResolvedValue([mockUser]);

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockUser]);
  });

  it('should get user by id', async () => {
    (UserService.getUserById as jest.MockedFunction<typeof UserService.getUserById>).mockResolvedValue(mockUser);

    const response = await request(app).get('/api/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should create a user', async () => {
    (UserService.createUser as jest.MockedFunction<typeof UserService.createUser>).mockResolvedValue(mockUser);

    const response = await request(app).post('/api/users').send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  it('should update a user', async () => {
    const updatedUser = { ...mockUser, firstName: 'Updated' };
    (UserService.updateUser as jest.MockedFunction<typeof UserService.updateUser>).mockResolvedValue(updatedUser);

    const response = await request(app).put('/api/users/1').send({ firstName: 'Updated' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedUser);
  });

  it('should delete a user', async () => {
    (UserService.deleteUser as jest.MockedFunction<typeof UserService.deleteUser>).mockResolvedValue(true);

    const response = await request(app).delete('/api/users/1');

    expect(response.status).toBe(204);
  });
});
