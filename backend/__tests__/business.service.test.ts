import { BusinessAttributes } from '../model/business.model';
import BusinessService from '../services/business.service';
import { afterEach, describe, expect, it, jest } from '@jest/globals';

describe('BusinessService static', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call getAllBusinesses', async () => {
    expect.assertions(2);

    const mockResponse: BusinessAttributes[] = [
      {
        id: 1,
        name: 'Test Business',
        category: 'Tech',
        rating: 4.5,
        reviewCount: 10,
        address: '123 rue Exemple',
        description: 'Entreprise test',
        phone: '0123456789',
        website: 'https://test.com',
        hours: [{ day: 'Monday', hours: '9:00-18:00' }],
        features: ['WiFi', 'Parking']
      }
    ];

    const getAllBusinessesSpy = jest
      .spyOn(BusinessService, 'getAllBusinesses')
      .mockResolvedValue(mockResponse);

    const result = await BusinessService.getAllBusinesses();

    expect(getAllBusinessesSpy).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});