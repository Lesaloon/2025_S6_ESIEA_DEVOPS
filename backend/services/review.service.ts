import DAOFactory from "../dao/DAOFactory";
import { Review, ReviewAttributes } from "../model/review.model";

class ReviewService {
	private static reviewDao = DAOFactory.getDAO(Review);

	static async getAllReviews(): Promise<ReviewAttributes[]> {
		return await this.reviewDao.findAll();
	}

	static async getReviewById(id: number): Promise<ReviewAttributes | null> {
		return await this.reviewDao.findById(id);
	}

	static async createReview(review: ReviewAttributes): Promise<ReviewAttributes> {
		return await this.reviewDao.create(review);
	}

	static async updateReview(reviewId: number, review: Partial<ReviewAttributes>): Promise<ReviewAttributes | null> {
		return await this.reviewDao.update(reviewId, review);
	}

	static async deleteReview(id: number): Promise<boolean> {
		return await this.reviewDao.delete(id);
	}
}

export default ReviewService;
