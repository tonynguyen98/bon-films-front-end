import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Film } from '../../models/film';
import { FilmService } from '../../services/film.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss'],
})
export class CreateReviewComponent implements OnInit {
  form: FormGroup;
  films: Film[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private filmService: FilmService,
  ) {
    this.form = this.fb.group({
      filmId: [null, Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      review: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadFilms();
    const id = this.route.snapshot.queryParamMap.get('filmId');
    if (id) {
      this.form.patchValue({ filmId: Number(id) });
    }
  }

  loadFilms(): void {
    this.filmService.getFilms().subscribe({
      next: (films) => {
        this.films = films;
      },
      error: () => {
        this.error = 'Unable to load film list.';
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.error = '';

    const payload = {
      film: { id: this.form.value.filmId },
      rating: this.form.value.rating,
      review: this.form.value.review,
    };

    this.reviewService.createReview(payload).subscribe({
      next: () => this.router.navigate(['/films']),
      error: () => {
        this.error = 'Unable to save review.';
        this.loading = false;
      },
    });
  }
}
