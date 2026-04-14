import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from 'src/app/models/film';
import { Review } from 'src/app/models/review';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private apiUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getAllFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/films`);
  }

  getReviewsByFilm(id: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/films/${id}/reviews`);
  }

  createFilm(
    title: string,
    genre: string,
    studio: string,
    director: string,
    topBilling: string,
    synopsis: string,
  ): Observable<Film> {
    const body: Film = {
      id: null,
      title,
      genre,
      studio,
      director,
      topBilling,
      synopsis,
      reviews: null,
    };

    const token = this.authService.getToken();
    return this.http.post<Film>(
      `${this.apiUrl}/films`,
      body,
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
