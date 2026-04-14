import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FilmReview} from 'src/app/models/film-review';
import {AuthService} from 'src/app/services/firebase/auth.service';
import {ReviewService} from 'src/app/services/review/review.service';
import {EditReviewComponent} from '../edit-review/edit-review.component';

@Component({
  standalone: false,
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {
  bsModalRef: BsModalRef;

  filmReviews: FilmReview[];

  constructor(
    private reviewService: ReviewService,
    public authService: AuthService,
    private router: Router,
    private modalService: BsModalService,
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

  deleteReview(id: string) {
    this.reviewService.deleteReview(id).subscribe(() => {
      this.reloadComponent();
    });
  }

  openEditReviewModal(filmReview: FilmReview) {
    const initialState = {
      filmReview: filmReview,
    };
    this.bsModalRef = this.modalService.show(EditReviewComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('/my-reviews');
  }

}
