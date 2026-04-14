import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotComponent } from './components/auth/forgot/forgot.component';
import { VerifyComponent } from './components/auth/verify/verify.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/firebase/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReviewService } from './services/review/review.service';
import { ReviewDetailsComponent } from './components/review-details/review-details.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FilmsComponent } from './components/films/films.component';
import { ReviewsByFilmComponent } from './components/reviews-by-film/reviews-by-film.component';
import { CreateReviewComponent } from './components/create-review/create-review.component';

import { RatingModule } from 'ngx-bootstrap/rating';
import { AddFilmComponent } from './components/add-film/add-film.component';
import { MyReviewsComponent } from './components/my-reviews/my-reviews.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    VerifyComponent,
    HomeComponent,
    NavbarComponent,
    ReviewDetailsComponent,
    ReviewsComponent,
    FilmsComponent,
    ReviewsByFilmComponent,
    CreateReviewComponent,
    AddFilmComponent,
    MyReviewsComponent,
    EditReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
  ],
  providers: [AuthService, ReviewService],
  bootstrap: [AppComponent],
})
export class AppModule {}
