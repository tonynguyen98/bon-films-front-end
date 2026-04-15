import { Film } from './film';

export interface Review {
  id: number;
  rating: number;
  review: string;
  userReviewedId: number;
  film?: Film | { id: number };
  dateReviewed?: string;
}
