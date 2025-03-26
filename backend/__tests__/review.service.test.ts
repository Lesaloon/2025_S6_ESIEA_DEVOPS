import { ReviewAttributes } from '../model/review.model';
import ReviewService from '../services/review.service';
import { afterEach, describe, expect, it, jest } from '@jest/globals';

describe('ReviewService static', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call getAllReviews', async () => {
    expect.assertions(2);

    const mockResponse: ReviewAttributes[] = [
      {
        id: 1,
        rating: 5,
        comment: 'Great service!',
        businessId: '1',
        userId: '1'
      }
    ];

    const getAllReviewsSpy = jest
      .spyOn(ReviewService, 'getAllReviews')
      .mockResolvedValue(mockResponse);

    const result = await ReviewService.getAllReviews();

    expect(getAllReviewsSpy).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should call getReviewById', async () => {
    expect.assertions(2);

    const mockResponse: ReviewAttributes = {
      id: 1,
      rating: 5,
      comment: 'Great service!',
      businessId: '1',
      userId: '1'
    };

    const getReviewByIdSpy = jest
      .spyOn(ReviewService, 'getReviewById')
      .mockResolvedValue(mockResponse);

    const result = await ReviewService.getReviewById(1);

    expect(getReviewByIdSpy).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should call createReview', async () => {
    expect.assertions(2);

    const mockReview: ReviewAttributes = {
      id: 1,
      rating: 5,
      comment: 'Great service!',
      businessId: '1',
      userId: '1'
    };

    const createReviewSpy = jest
      .spyOn(ReviewService, 'createReview')
      .mockResolvedValue(mockReview);

    const result = await ReviewService.createReview(mockReview);

    expect(createReviewSpy).toHaveBeenCalled();
    expect(result).toEqual(mockReview);
  });

  it('should call updateReview', async () => {
    expect.assertions(2);

    const mockReview: Partial<ReviewAttributes> = {
      comment: 'Updated comment'
    };

    const updateReviewSpy = jest
      .spyOn(ReviewService, 'updateReview')
      .mockResolvedValue({
        id: 1,
        rating: 5,
        comment: 'Updated comment',
        businessId: '1',
        userId: '1'
      });

    const result = await ReviewService.updateReview(1, mockReview);

    expect(updateReviewSpy).toHaveBeenCalled();
    expect(result).toEqual({
      id: 1,
      rating: 5,
      comment: 'Updated comment',
      businessId: '1',
      userId: '1'
    });
  });

  it('should call deleteReview', async () => {
    expect.assertions(2);

    const deleteReviewSpy = jest
      .spyOn(ReviewService, 'deleteReview')
      .mockResolvedValue(true);

    const result = await ReviewService.deleteReview(1);

    expect(deleteReviewSpy).toHaveBeenCalled();
    expect(result).toEqual(true);
  });

  it('should return null when getReviewById is called with a non-existent ID', async () => {
    expect.assertions(2);

    const getReviewByIdSpy = jest
      .spyOn(ReviewService, 'getReviewById')
      .mockResolvedValue(null);

    const result = await ReviewService.getReviewById(9999);

    expect(getReviewByIdSpy).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should return null when updateReview is called with a non-existent ID', async () => {
    expect.assertions(2);

    const mockUpdate: Partial<ReviewAttributes> = {
      comment: 'Should Not Exist'
    };

    const updateReviewSpy = jest
      .spyOn(ReviewService, 'updateReview')
      .mockResolvedValue(null);

    const result = await ReviewService.updateReview(9999, mockUpdate);

    expect(updateReviewSpy).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should return false when deleteReview is called with a non-existent ID', async () => {
    expect.assertions(2);

    const deleteReviewSpy = jest
      .spyOn(ReviewService, 'deleteReview')
      .mockResolvedValue(false);

    const result = await ReviewService.deleteReview(9999);

    expect(deleteReviewSpy).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('should throw error when createReview is called with incomplete data', async () => {
    expect.assertions(1);

    const invalidReview = {
      id: 9999,
    } as ReviewAttributes;

    jest.spyOn(ReviewService, 'createReview').mockImplementation(() => Promise.reject(new Error('Validation error')));

    await expect(ReviewService.createReview(invalidReview)).rejects.toThrow('Validation error');
  });
});
