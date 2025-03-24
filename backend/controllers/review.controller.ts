import { Request, Response } from 'express';

class ReviewController {
	static async getAllReviews(req: Request, res: Response) {
		res.send("Get all reviews");
	}

	static async getReviewById(req: Request, res: Response) {
		res.send("Get review by id");
	}

	static async createReview(req: Request, res: Response) {
		res.send("Create review");
	}

	static async updateReview(req: Request, res: Response) {
		res.send("Update review");
	}

}

export default ReviewController;