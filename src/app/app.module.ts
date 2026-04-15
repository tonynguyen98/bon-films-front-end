import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FilmsComponent } from './pages/films/films.component';
import { FilmDetailsComponent } from './pages/film-details/film-details.component';
import { ReviewDetailsComponent } from './pages/review-details/review-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyReviewsComponent } from './pages/my-reviews/my-reviews.component';
import { CreateReviewComponent } from './pages/create-review/create-review.component';
import { AddFilmComponent } from './pages/add-film/add-film.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FilmsComponent,
    FilmDetailsComponent,
    ReviewDetailsComponent,
    LoginComponent,
    RegisterComponent,
    MyReviewsComponent,
    CreateReviewComponent,
    AddFilmComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
