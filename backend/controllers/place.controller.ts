import { Request, Response } from 'express';
import { Business } from '../model/business.model';
import BusinessService from '../services/business.service';

class PlaceController {

	/**
	 * @description Get all places
	 * @route GET /places
	 * @access Public
	 * @returns {Object} 200 - An array of places
	 * @returns {Error} 500 - Internal server error
	 * @param req 
	 * @param res 
	 */
	static async getAllPlaces(req: Request, res: Response) {
		const business = await BusinessService.getAllBusinesses();
		res.status(200).json(business);
	}

	static async getPlaceById(req: Request, res: Response) {
		const { id } = req.params;
		const business = await BusinessService.getBusinessById(Number(id));
		res.status(200).json(business);
	}

	static async createPlace(req: Request, res: Response) {
		const business = await BusinessService.createBusiness(req.body as Business);
		res.status(201).json(business);
	}

	static async updatePlace(req: Request, res: Response) {
		const { id } = req.params;
		const business = await BusinessService.updateBusiness(Number(id), req.body as Business);
		res.status(200).json(business);
	}

	static async deletePlace(req: Request, res: Response) {
		const { id } = req.params;
		const deleted = await BusinessService.deleteBusiness(Number(id));
		if (deleted) {
			res.status(204).send();
		} else {
			res.status(404).send();
		}
	}
}

export default PlaceController;