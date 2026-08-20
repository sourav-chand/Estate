import { reviews } from '../data/reviews';
import type { Review } from '../types';

export const reviewService = {
  async getReviews(): Promise<Review[]> {
    return reviews;
  },
};
