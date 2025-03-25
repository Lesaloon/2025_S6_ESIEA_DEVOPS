import { Request, Response } from 'express';
import DAOFactory from '../dao/DAOFactory';
import { Business } from '../model/business.model';

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
		const businessDao = DAOFactory.getDAO(Business);
		const business = await businessDao.findAll();
		res.status(200).json(business);
	}

	static async getPlaceById(req: Request, res: Response) {
		res.send("Get place by id");
	}

	static async createPlace(req: Request, res: Response) {
		res.send("Create place");
	}

	static async updatePlace(req: Request, res: Response) {
		res.send("Update place");
	}

	static async deletePlace(req: Request, res: Response) {
		res.send("Delete place");
	}

	static async getPlacesByUserId(req: Request, res: Response) {
		res.send("Get places by user id");
	}

	static async getPlacesByCategory(req: Request, res: Response) {
		res.send("Get places by category");
	}

	static async getPlacesByLocation(req: Request, res: Response) {
		res.send("Get places by location");
	}

	static async searchPlaces(req: Request, res: Response) {
		res.send("Search places");
	}
}

export default PlaceController;