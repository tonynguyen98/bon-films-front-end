import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss'],
})
export class ReviewDetailsComponent implements OnInit {
  review: Review | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.reviewService.getReview(id).subscribe({
        next: (review) => {
          this.review = review;
          this.loading = false;
        },
        error: () => {
          this.error = 'Unable to load review details.';
          this.loading = false;
        },
      });
    }
  }
}
