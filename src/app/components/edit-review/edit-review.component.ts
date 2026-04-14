import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FilmReview} from 'src/app/models/film-review';
import {ReviewService} from 'src/app/services/review/review.service';

@Component({
  standalone: false,
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent implements OnInit {
  editReviewForm: FormGroup;

  filmReview: FilmReview;

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private fb: FormBuilder,
    private reviewService: ReviewService,
  ) {
  }

  get rating() {
    return this.editReviewForm.get('rating');
  }

  get review() {
    return this.editReviewForm.get('review');
  }

  ngOnInit(): void {
    this.editReviewForm = this.fb.group({
      rating: [this.filmReview.rating, [Validators.required]],
      review: [this.filmReview.review, [Validators.required]],
    });
  }

  hideModalAndReloadComponent() {
    this.bsModalRef.hide();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('/my-reviews');
  }

  onSubmit() {
    this.reviewService.editReview(
      this.filmReview.id,
      this.rating.value,
      this.review.value,
    ).subscribe(() => {
      this.hideModalAndReloadComponent();
    });
  }

}
