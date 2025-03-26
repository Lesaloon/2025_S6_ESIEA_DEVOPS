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

  it('should call getBusinessById', async () => {
    expect.assertions(2);

    const mockResponse: BusinessAttributes = {
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
    };

    const getBusinessByIdSpy = jest
      .spyOn(BusinessService, 'getBusinessById')
      .mockResolvedValue(mockResponse);

    const result = await BusinessService.getBusinessById(1);

    expect(getBusinessByIdSpy).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should call createBusiness', async () => {
    expect.assertions(2);

    const mockBusiness: BusinessAttributes = {
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
    };

    const createBusinessSpy = jest
      .spyOn(BusinessService, 'createBusiness')
      .mockResolvedValue(mockBusiness);

    const result = await BusinessService.createBusiness(mockBusiness);

    expect(createBusinessSpy).toHaveBeenCalled();
    expect(result).toEqual(mockBusiness);
  });

  it('should call updateBusiness', async () => {
    expect.assertions(2);

    const mockBusiness: Partial<BusinessAttributes> = {
      name: 'Updated Business'
    };

    const updateBusinessSpy = jest
      .spyOn(BusinessService, 'updateBusiness')
      .mockResolvedValue({
        id: 1,
        name: 'Updated Business',
        category: 'Tech',
        rating: 4.5,
        reviewCount: 10,
        address: '123 rue Exemple',
        description: 'Entreprise test',
        phone: '0123456789',
        website: 'https://test.com',
        hours: [{ day: 'Monday', hours: '9:00-18:00' }],
        features: ['WiFi', 'Parking']
      });

    const result = await BusinessService.updateBusiness(1, mockBusiness);

    expect(updateBusinessSpy).toHaveBeenCalled();
    expect(result).toEqual({
      id: 1,
      name: 'Updated Business',
      category: 'Tech',
      rating: 4.5,
      reviewCount: 10,
      address: '123 rue Exemple',
      description: 'Entreprise test',
      phone: '0123456789',
      website: 'https://test.com',
      hours: [{ day: 'Monday', hours: '9:00-18:00' }],
      features: ['WiFi', 'Parking']
    });
  });

  it('should call deleteBusiness', async () => {
    expect.assertions(2);
 
    const deleteBusinessSpy = jest
      .spyOn(BusinessService, 'deleteBusiness')
      .mockResolvedValue(true);
 
    const result = await BusinessService.deleteBusiness(1);
 
    expect(deleteBusinessSpy).toHaveBeenCalled();
    expect(result).toEqual(true);
  });
 
  it('should return null when getBusinessById is called with a non-existent ID', async () => {
    expect.assertions(2);
 
    const getBusinessByIdSpy = jest
      .spyOn(BusinessService, 'getBusinessById')
      .mockResolvedValue(null);
 
    const result = await BusinessService.getBusinessById(9999);
 
    expect(getBusinessByIdSpy).toHaveBeenCalled();
    expect(result).toBeNull();
  });
 
  it('should return null when updateBusiness is called with a non-existent ID', async () => {
    expect.assertions(2);
 
    const mockUpdate: Partial<BusinessAttributes> = {
      name: 'Should Not Exist'
    };
 
    const updateBusinessSpy = jest
      .spyOn(BusinessService, 'updateBusiness')
      .mockResolvedValue(null);
 
    const result = await BusinessService.updateBusiness(9999, mockUpdate);
 
    expect(updateBusinessSpy).toHaveBeenCalled();
    expect(result).toBeNull();
  });
 
  it('should return false when deleteBusiness is called with a non-existent ID', async () => {
    expect.assertions(2);
 
    const deleteBusinessSpy = jest
      .spyOn(BusinessService, 'deleteBusiness')
      .mockResolvedValue(false);
 
    const result = await BusinessService.deleteBusiness(9999);
 
    expect(deleteBusinessSpy).toHaveBeenCalled();
    expect(result).toBe(false);
  });
 
  it('should throw error when createBusiness is called with incomplete data', async () => {
    expect.assertions(1);
 
    const invalidBusiness = {
      id: 9999,
    } as BusinessAttributes;
 
    jest.spyOn(BusinessService, 'createBusiness').mockImplementation(() => Promise.reject(new Error('Validation error')));
 
    await expect(BusinessService.createBusiness(invalidBusiness)).rejects.toThrow('Validation error');
  });
});