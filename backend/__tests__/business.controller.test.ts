import request from 'supertest';
import app from '../start';
import { jest } from '@jest/globals';
import BusinessService from '../services/business.service';
import { BusinessAttributes } from '../model/business.model';

jest.mock('../services/business.service');

describe('BusinessController', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all businesses', async () => {
    (BusinessService.getAllBusinesses as jest.MockedFunction<typeof BusinessService.getAllBusinesses>).mockResolvedValue([mockBusiness]);

    const response = await request(app).get('/api/businesses');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockBusiness]);
  });

  it('should get business by id', async () => {
    (BusinessService.getBusinessById as jest.MockedFunction<typeof BusinessService.getBusinessById>).mockResolvedValue(mockBusiness);

    const response = await request(app).get('/api/businesses/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBusiness);
  });

  it('should create a business', async () => {
    (BusinessService.createBusiness as jest.MockedFunction<typeof BusinessService.createBusiness>).mockResolvedValue(mockBusiness);

    const response = await request(app).post('/api/businesses').send(mockBusiness);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockBusiness);
  });

  it('should update a business', async () => {
    const updatedBusiness = { ...mockBusiness, name: 'Updated Business' };
    (BusinessService.updateBusiness as jest.MockedFunction<typeof BusinessService.updateBusiness>).mockResolvedValue(updatedBusiness);

    const response = await request(app).put('/api/businesses/1').send({ name: 'Updated Business' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedBusiness);
  });

  it('should delete a business', async () => {
    (BusinessService.deleteBusiness as jest.MockedFunction<typeof BusinessService.deleteBusiness>).mockResolvedValue(true);

    const response = await request(app).delete('/api/businesses/1');

    expect(response.status).toBe(204);
  });
});