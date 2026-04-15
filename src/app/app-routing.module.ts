import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilmsComponent } from './pages/films/films.component';
import { FilmDetailsComponent } from './pages/film-details/film-details.component';
import { ReviewDetailsComponent } from './pages/review-details/review-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyReviewsComponent } from './pages/my-reviews/my-reviews.component';
import { CreateReviewComponent } from './pages/create-review/create-review.component';
import { AddFilmComponent } from './pages/add-film/add-film.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'film/:id', component: FilmDetailsComponent },
  { path: 'review/:id', component: ReviewDetailsComponent },
  { path: 'create-review', component: CreateReviewComponent },
  { path: 'add-film', component: AddFilmComponent },
  { path: 'my-reviews', component: MyReviewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
