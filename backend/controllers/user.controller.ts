import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.getUserById(Number(id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send();
    }
  }

  static async createUser(req: Request, res: Response) {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.updateUser(Number(id), req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send();
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await UserService.deleteUser(Number(id));
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  }

}

export default UserController;