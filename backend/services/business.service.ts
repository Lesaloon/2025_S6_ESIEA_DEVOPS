import DAOFactory from "../dao/DAOFactory";
import { Business, BusinessAttributes } from "../model/business.model";

class BusinessService {
	private static businessDao = DAOFactory.getDAO(Business);

	static async getAllBusinesses(): Promise<BusinessAttributes[]> {
		const businesses: BusinessAttributes[] = await this.businessDao.findAll();
		return businesses;
	}

	static async getBusinessById(id: number): Promise<BusinessAttributes | null> {
		return await this.businessDao.findById(id);
	}

	static async createBusiness(business: BusinessAttributes): Promise<BusinessAttributes> {
		return await this.businessDao.create(business);
	}

	static async updateBusiness(businessId: number, business: Partial<Business>): Promise<BusinessAttributes | null> {
		return await this.businessDao.update(businessId, business);
	}

	static async deleteBusiness(id: number): Promise<boolean> {
		return await this.businessDao.delete(id);
	}
}

export default BusinessService;