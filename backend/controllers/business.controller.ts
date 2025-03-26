import { Request, Response } from 'express';
import { Business } from '../model/business.model';
import BusinessService from '../services/business.service';

class BusinessController {

	/**
	 * @description Get all businesss
	 * @route GET /businesss
	 * @access Public
	 * @returns {Object} 200 - An array of businesss
	 * @returns {Error} 500 - Internal server error
	 * @param req 
	 * @param res 
	 */
	static async getAllBusinesss(req: Request, res: Response) {
		const business = await BusinessService.getAllBusinesses();
		res.status(200).json(business);
	}

	static async getBusinessById(req: Request, res: Response) {
		const { id } = req.params;
		const business = await BusinessService.getBusinessById(Number(id));
		res.status(200).json(business);
	}

	static async createBusiness(req: Request, res: Response) {
		const business = await BusinessService.createBusiness(req.body as Business);
		res.status(201).json(business);
	}

	static async updateBusiness(req: Request, res: Response) {
		const { id } = req.params;
		const business = await BusinessService.updateBusiness(Number(id), req.body as Business);
		res.status(200).json(business);
	}

	static async deleteBusiness(req: Request, res: Response) {
		const { id } = req.params;
		const deleted = await BusinessService.deleteBusiness(Number(id));
		if (deleted) {
			res.status(204).send();
		} else {
			res.status(404).send();
		}
	}
}

export default BusinessController;