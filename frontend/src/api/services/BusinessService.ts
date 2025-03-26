import apiClient from '../ApiClient';
import { Business } from '../../models/Business';

export class BusinessService {
  private static instance: BusinessService;

  private constructor() {}

  public static getInstance(): BusinessService {
    if (!BusinessService.instance) {
      BusinessService.instance = new BusinessService();
    }
    return BusinessService.instance;
  }

  public async getAllBusinesses(): Promise<Business[]> {
    try {
      const response = await apiClient.get<any>('/businesses');
      
      if (Array.isArray(response)) {
        return response;
      }
      
      if (response && typeof response === 'object') {
        if (Array.isArray(response.data)) return response.data;
        if (Array.isArray(response.businesses)) return response.businesses;
        if (Array.isArray(response.results)) return response.results;
      }
      
      console.warn('Format de réponse inattendu:', response);
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des businesses:', error);
      throw error;
    }
  }

  public async getBusinessById(id: number): Promise<Business> {
    return await apiClient.get<Business>(`/businesses/${id}`);
  }

  public async createBusiness(business: Omit<Business, 'id' | 'rating' | 'reviewCount'>): Promise<Business> {
    return await apiClient.post<Business>('/businesses', business);
  }

  public async updateBusiness(id: number, business: Partial<Business>): Promise<Business> {
    return await apiClient.put<Business>(`/businesses/${id}`, business);
  }

  public async deleteBusiness(id: number): Promise<boolean> {
    return await apiClient.delete<boolean>(`/businesses/${id}`);
  }
}

export default BusinessService.getInstance();
