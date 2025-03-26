import { Request, Response } from 'express';
import ReviewService from '../services/review.service';

class ReviewController {
	static async getAllReviews(req: Request, res: Response) {
		const reviews = await ReviewService.getAllReviews();
		res.status(200).json(reviews);
	}

	static async getReviewById(req: Request, res: Response) {
		const { id } = req.params;
		const review = await ReviewService.getReviewById(Number(id));
		if (review) {
			res.status(200).json(review);
		} else {
			res.status(404).send();
		}	
	}

	static async createReview(req: Request, res: Response) {
		const review = await ReviewService.createReview(req.body);
		res.status(201).json(review);
	}

	static async updateReview(req: Request, res: Response) {
		const { id } = req.params;
		const review = await ReviewService.updateReview(Number(id), req.body);
		if (review) {
			res.status(200).json(review);
		} else {
			res.status(404).send();
		}
	}

	static async deleteReview(req: Request, res: Response) {
		const { id } = req.params;
		const deleted = await ReviewService.deleteReview(Number(id));
		if (deleted) {
			res.status(204).send();
		} else {
			res.status(404).send();
		}
	}

}

export default ReviewController;