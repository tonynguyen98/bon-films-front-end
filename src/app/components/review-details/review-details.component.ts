import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Review} from 'src/app/models/review';
import {ReviewService} from 'src/app/services/review/review.service';

@Component({
  standalone: false,
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss']
})
export class ReviewDetailsComponent implements OnInit {

  review: Review;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getReviewById();
    this.reloadComponent();
  }

  getReviewById() {
    const id = this.route.snapshot.paramMap.get('id');
    this.reviewService.getReviewById(id).subscribe(
      data => {
        this.review = data;
      }
    );
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }
}
