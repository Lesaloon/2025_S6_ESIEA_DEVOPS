import DAOFactory from "../dao/DAOFactory";
import { User, UserAttributes } from "../model/user.model";

class UserService {
	private static userDao = DAOFactory.getDAO(User);

	static async getAllUsers(): Promise<UserAttributes[]> {
		return await this.userDao.findAll();
	}

	static async getUserById(id: number): Promise<UserAttributes | null> {
		return await this.userDao.findById(id);
	}

	static async createUser(user: UserAttributes): Promise<UserAttributes> {
		return await this.userDao.create(user);
	}

	static async updateUser(userId: number, user: Partial<UserAttributes>): Promise<UserAttributes | null> {
		return await this.userDao.update(userId, user);
	}

	static async deleteUser(id: number): Promise<boolean> {
		return await this.userDao.delete(id);
	}
}

export default UserService;
