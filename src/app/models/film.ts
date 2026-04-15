import { Review } from './review';

export interface Film {
  id: number;
  title: string;
  genre: string;
  studio?: string;
  director?: string;
  topBilling?: string;
  synopsis?: string;
  reviews?: Review[];
}
