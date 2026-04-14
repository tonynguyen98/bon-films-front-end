import {Component, OnInit} from '@angular/core';
import {FilmReview} from 'src/app/models/film-review';
import {AuthService} from 'src/app/services/firebase/auth.service';
import {ReviewService} from 'src/app/services/review/review.service';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filmReviews: FilmReview[];

  rate = 10;

  constructor(
    public authService: AuthService,
    private reviewService: ReviewService
  ) {
  }

  ngOnInit(): void {
    this.getAllReviews();
  }

  getAllReviews() {
    this.reviewService.getAllReviews().subscribe(
      data => {
        this.filmReviews = data;
        this.filmReviews.reverse();
      }
    );
  }
}

