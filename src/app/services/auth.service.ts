import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse } from '../models/auth';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'bon-films-token';

  constructor(private http: HttpClient) {}

  login(payload: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.baseUrl}/auth/login`, payload)
      .pipe(
        tap((result) => {
          localStorage.setItem(this.tokenKey, result.token);
        }),
      );
  }

  register(payload: AuthRequest): Observable<void> {
    return this.http.post<void>(
      `${environment.baseUrl}/auth/register`,
      payload,
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    window.location.href = '/login';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
