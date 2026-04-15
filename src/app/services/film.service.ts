import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Film } from '../models/film';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilmService {
  constructor(private api: ApiService) {}

  getFilms(): Observable<Film[]> {
    return this.api.get<Film[]>('/films');
  }

  getFilm(id: number): Observable<Film> {
    return this.api.get<Film>(`/films/${id}`);
  }

  createFilm(film: Partial<Film>): Observable<Film> {
    return this.api.post<Film>('/films', film);
  }
}
