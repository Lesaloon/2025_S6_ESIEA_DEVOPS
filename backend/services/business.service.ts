import DAOFactory from "../dao/DAOFactory";
import { Business } from "../model/business.model";

class BusinessService {
	private static businessDao = DAOFactory.getDAO(Business);

	static async getAllBusinesses() {
		return await this.businessDao.findAll();
	}

	static async getBusinessById(id: number) {
		return await this.businessDao.findById(id);
	}


}

export default BusinessService;