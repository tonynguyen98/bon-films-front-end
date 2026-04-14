import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import {Film} from 'src/app/models/film';
import {FilmService} from 'src/app/services/film/film.service';
import {AuthService} from 'src/app/services/firebase/auth.service';
import {ReviewService} from 'src/app/services/review/review.service';
import {AddFilmComponent} from '../add-film/add-film.component';

@Component({
  standalone: false,
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {
  bsModalRef: BsModalRef;

  createReviewForm: FormGroup;

  films: Film[];

  userId: string;

  constructor(
    private filmService: FilmService,
    public reviewService: ReviewService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
  ) {
  }

  get film() {
    return this.createReviewForm.get('film');
  }

  get rating() {
    return this.createReviewForm.get('rating');
  }

  get review() {
    return this.createReviewForm.get('review');
  }

  ngOnInit() {
    this.getAllFilms();

    this.createReviewForm = this.fb.group({
      film: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      review: ['', [Validators.required]],
    });
  }

  openAddFilmModal() {
    const initialState = {};
    this.bsModalRef = this.modalService.show(AddFilmComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  getAllFilms() {
    this.filmService.getAllFilms().subscribe(
      data => {
        this.films = data;
      }
    );
  }

  onSubmit() {
    // this.userId = this.authService.userData.displayName
    //   ? this.authService.userData.displayName
    //   : "Anonymous User - " + this.authService.userData.uid;
    this.userId = this.authService.userData.uid;

    this.reviewService.createReview(
      this.rating.value,
      this.review.value,
      this.userId,
      this.film.value
    ).subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }

}
