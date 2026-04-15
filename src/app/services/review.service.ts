import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Review } from '../models/review';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private api: ApiService) {}

  getReview(id: number): Observable<Review> {
    return this.api.get<Review>(`/reviews/${id}`);
  }

  getReviewsByFilm(filmId: number): Observable<Review[]> {
    return this.api.get<Review[]>(`/films/${filmId}/reviews`);
  }

  getMyReviews(): Observable<Review[]> {
    return this.api.get<Review[]>('/film-reviews');
  }

  createReview(review: Partial<Review>): Observable<Review> {
    return this.api.post<Review>('/reviews', review);
  }

  deleteReview(id: number): Observable<void> {
    return this.api.delete<void>(`/reviews/${id}`);
  }
}
