import apiClient from '../ApiClient';
import { Review } from '../../models/Review';

export class ReviewService {
  private static instance: ReviewService;

  private constructor() {}

  public static getInstance(): ReviewService {
    if (!ReviewService.instance) {
      ReviewService.instance = new ReviewService();
    }
    return ReviewService.instance;
  }

  public async getAllReviews(): Promise<Review[]> {
    return await apiClient.get<Review[]>('/reviews');
  }

  public async getReviewById(id: number): Promise<Review> {
    return await apiClient.get<Review>(`/reviews/${id}`);
  }

  public async getReviewsByBusiness(businessId: number): Promise<Review[]> {
    try {
      const response = await this.getAllReviews();
  
      if (Array.isArray(response)) {
        return response.filter(review => review.businessId === businessId);
      }
  
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des reviews:', error);
      return [];
    }
  }

  public async getNbReviewsByBusiness(businessId: number): Promise<number> {
    const reviews = await this.getReviewsByBusiness(businessId);
    return reviews.length;
  }

  public async getReviewsByUser(userId: number): Promise<Review[]> {
    return await apiClient.get<Review[]>(`/users/${userId}/reviews`);
  }

  public async createReview(review: Omit<Review, 'id'>): Promise<Review> {
    return await apiClient.post<Review>('/reviews', review);
  }

  public async updateReview(id: number, review: Partial<Review>): Promise<Review> {
    return await apiClient.put<Review>(`/reviews/${id}`, review);
  }

  public async deleteReview(id: number): Promise<boolean> {
    return await apiClient.delete<boolean>(`/reviews/${id}`);
  }
}

export default ReviewService.getInstance();
