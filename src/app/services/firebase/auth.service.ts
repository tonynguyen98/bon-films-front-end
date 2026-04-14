import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any = null;

  constructor(
    private http: HttpClient,
    public router: Router,
    public ngZone: NgZone,
  ) {
    const storedUser = localStorage.getItem('user');
    this.userData = storedUser ? JSON.parse(storedUser) : null;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async SignIn(email: string, password: string) {
    try {
      const response: any = await this.http
        .post(`${environment.baseUrl}/auth/login`, { email, password })
        .toPromise();
      if (response?.token && response?.user) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userData = response.user;
        this.ngZone.run(() => this.reloadComponent('/home'));
      }
    } catch (error: any) {
      window.alert(error?.error?.message || error?.message || 'Login failed');
    }
  }

  async SignUp(email: string, password: string) {
    try {
      await this.http
        .post(`${environment.baseUrl}/auth/register`, { email, password })
        .toPromise();
      window.alert('Registration successful. Please sign in.');
      this.router.navigate(['login']);
    } catch (error: any) {
      window.alert(
        error?.error?.message || error?.message || 'Registration failed',
      );
    }
  }

  async ForgotPassword(passwordResetEmail: string) {
    try {
      await this.http
        .post(`${environment.baseUrl}/auth/forgot-password`, {
          email: passwordResetEmail,
        })
        .toPromise();
      window.alert(
        'Password reset request accepted. Check your email if configured.',
      );
      this.router.navigate(['login']);
    } catch (error: any) {
      window.alert(
        error?.error?.message || error?.message || 'Failed to reset password',
      );
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  SignOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.userData = null;
    this.router.navigate(['home']);
  }

  reloadComponent(newUrl: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl(newUrl);
  }
}
