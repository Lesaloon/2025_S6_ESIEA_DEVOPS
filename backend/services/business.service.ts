import DAOFactory from "../dao/DAOFactory";
import { Business, BusinessAttributes } from "../model/business.model";

class BusinessService {
	private static businessDao = DAOFactory.getDAO(Business);

	static async getAllBusinesses(): Promise<BusinessAttributes[]> {
		return await this.businessDao.findAll();
	}

	static async getBusinessById(id: number) {
		return await this.businessDao.findById(id);
	}

	static async createBusiness(business: Business) {
		return await this.businessDao.create(business);
	}

	static async updateBusiness(businessId: number, business: Partial<Business>) {
		return await this.businessDao.update(businessId, business);
	}

	static async deleteBusiness(id: number) {
		return await this.businessDao.delete(id);
	}


}

export default BusinessService;