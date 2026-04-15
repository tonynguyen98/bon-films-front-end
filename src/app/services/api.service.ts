import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly apiUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  get<T>(path: string) {
    return this.http.get<T>(`${this.apiUrl}${path}`);
  }

  post<T>(path: string, body: any) {
    return this.http.post<T>(`${this.apiUrl}${path}`, body);
  }

  put<T>(path: string, body: any) {
    return this.http.put<T>(`${this.apiUrl}${path}`, body);
  }

  delete<T>(path: string) {
    return this.http.delete<T>(`${this.apiUrl}${path}`);
  }
}
