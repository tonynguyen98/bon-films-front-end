import {Component, OnInit} from '@angular/core';
import {FilmReview} from 'src/app/models/film-review';
import {ReviewService} from 'src/app/services/review/review.service';

@Component({
  standalone: false,
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  filmReviews: FilmReview[];

  constructor(
    private reviewService: ReviewService,
  ) {
  }

  ngOnInit(): void {
    this.getAllReviews();
  }

  getAllReviews() {
    this.reviewService.getAllReviews().subscribe(
      data => {
        this.filmReviews = data;
      }
    );
  }
}
