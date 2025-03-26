import request from "supertest";
import app from "../start";
import { jest } from "@jest/globals";
import crypto from "crypto";
import AuthService from "../services/auth.service";
import { User, UserAttributes } from "../model/user.model";
import DAOFactory from "../dao/DAOFactory";

jest.mock("../services/auth.service");

describe("AuthController", () => {
  const mockUser: UserAttributes = {
    id: 1,
    email: "test@test.com",
    password: crypto.hash("sha512", "password"),
    firstName: "Test",
    lastName: "User",
    role: "user",
  };

  const userDAO = DAOFactory.getDAO(User);
  userDAO.create(mockUser);

  it("should login the user", async () => {
    (
      jest.spyOn(AuthService, "login") as jest.MockedFunction<
        typeof AuthService.login
      >
    ).mockResolvedValue({
      user: mockUser as User,
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "password" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      user: mockUser,
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });
  });

  it("should return 400 if email or password is missing", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email });

    expect(response.status).toBe(400);
    expect(response.text).toBe("Email and password are required");
  });
});