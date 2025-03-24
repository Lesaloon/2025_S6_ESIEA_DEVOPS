import { Request, Response } from 'express';

class UserController {
  static async getAllUsers(req: Request, res: Response) {
	res.send("Get all users");
  }

  static async getUserById(req: Request, res: Response) {
	res.send("Get user by id");
  }

  static async createUser(req: Request, res: Response) {
	res.send("Create user");
  }

}

export default UserController;