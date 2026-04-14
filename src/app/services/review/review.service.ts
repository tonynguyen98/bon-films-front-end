import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmReview } from 'src/app/models/film-review';
import { Review } from 'src/app/models/review';
import { Film } from 'src/app/models/film';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getAllReviews(): Observable<FilmReview[]> {
    return this.http.get<FilmReview[]>(`${this.apiUrl}/film-reviews`);
  }

  getReviewById(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/reviews/${id}`);
  }

  createReview(
    rating: number,
    review: string,
    userReviewedId: string,
    film: Film,
  ): Observable<Review> {
    const body: Review = {
      id: null,
      rating,
      review,
      userReviewedId,
      film,
      dateReviewed: null,
    };

    const token = this.authService.getToken();
    return this.http.post<Review>(
      `${this.apiUrl}/reviews`,
      body,
      httpOptionsWithAuthToken(token),
    );
  }

  editReview(id: number, rating: number, review: string): Observable<Review> {
    const token = this.authService.getToken();
    return this.http.put<Review>(
      `${this.apiUrl}/reviews/${id}`,
      { rating, review },
      httpOptionsWithAuthToken(token),
    );
  }

  deleteReview(id: string): Observable<any> {
    const token = this.authService.getToken();
    return this.http.delete(
      `${this.apiUrl}/reviews/${id}`,
      httpOptionsWithAuthToken(token),
    );
  }
}

const httpOptionsWithAuthToken = (token: string | null) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }),
});
