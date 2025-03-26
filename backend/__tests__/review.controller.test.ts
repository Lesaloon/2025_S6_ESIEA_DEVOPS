import request from 'supertest';
import { jest } from '@jest/globals';
import app from '../start';
import ReviewService from '../services/review.service';
import { Review, ReviewAttributes } from '../model/review.model';

jest.mock('../services/review.service');

describe('ReviewController', () => {
  const mockReview: ReviewAttributes = {
    id: 1,
    rating: 5,
    comment: 'Great service!',
    businessId: '1',
    userId: '1'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all reviews', async () => {
    (ReviewService.getAllReviews as jest.MockedFunction<typeof ReviewService.getAllReviews>).mockResolvedValue([mockReview]);

    const response = await request(app).get('/api/reviews');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockReview]);
  });

  it('should get review by id', async () => {
    (ReviewService.getReviewById as jest.MockedFunction<typeof ReviewService.getReviewById>).mockResolvedValue(mockReview);

    const response = await request(app).get('/api/reviews/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockReview);
  });

  it('should create a review', async () => {
    (ReviewService.createReview as jest.MockedFunction<typeof ReviewService.createReview>).mockResolvedValue(mockReview);

    const response = await request(app).post('/api/reviews').send(mockReview);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockReview);
  });

  it('should update a review', async () => {
    const updatedReview = { ...mockReview, comment: 'Updated comment' };
    (ReviewService.updateReview as jest.MockedFunction<typeof ReviewService.updateReview>).mockResolvedValue(updatedReview);

    const response = await request(app).put('/api/reviews/1').send({ comment: 'Updated comment' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedReview);
  });

  it('should delete a review', async () => {
    (ReviewService.deleteReview as jest.MockedFunction<typeof ReviewService.deleteReview>).mockResolvedValue(true);

    const response = await request(app).delete('/api/reviews/1');

    expect(response.status).toBe(204);
  });
});
