import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Film } from '../../models/film';
import { Review } from '../../models/review';
import { FilmService } from '../../services/film.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent implements OnInit {
  film: Film | null = null;
  reviews: Review[] = [];
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private reviewService: ReviewService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Invalid film ID.';
      return;
    }
    this.loading = true;
    this.error = '';

    this.filmService.getFilm(id).subscribe({
      next: (film) => {
        this.film = film;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load film details.';
        this.loading = false;
      },
    });

    this.reviewService.getReviewsByFilm(id).subscribe({
      next: (reviews) => (this.reviews = reviews),
      error: () => (this.error = 'Unable to load film reviews.'),
    });
  }

  deleteReview(review: Review): void {
    if (!confirm('Delete this review?')) {
      return;
    }
    this.reviewService.deleteReview(review.id).subscribe({
      next: () =>
        (this.reviews = this.reviews.filter((item) => item.id !== review.id)),
      error: () => (this.error = 'Unable to delete review.'),
    });
  }
}
