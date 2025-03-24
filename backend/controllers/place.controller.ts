import { Request, Response } from 'express';

class PlaceController {
	static async getAllPlaces(req: Request, res: Response) {
		res.send("Get all places");
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