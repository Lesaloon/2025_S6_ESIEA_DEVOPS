import apiClient from './ApiClient';
import authService from './services/AuthService';
import userService from './services/UserService';
import businessService from './services/BusinessService';
import reviewService from './services/ReviewService';

export {
  apiClient,
  authService,
  userService,
  businessService,
  reviewService
};

export default {
  auth: authService,
  users: userService,
  businesses: businessService,
  reviews: reviewService
};
