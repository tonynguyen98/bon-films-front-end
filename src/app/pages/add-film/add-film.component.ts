import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-add-film',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss'],
})
export class AddFilmComponent {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private filmService: FilmService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      studio: [''],
      director: [''],
      topBilling: [''],
      synopsis: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.filmService.createFilm(this.form.value).subscribe({
      next: () => this.router.navigate(['/films']),
      error: () => {
        this.error = 'Unable to create film. Please try again.';
        this.loading = false;
      },
    });
  }
}
