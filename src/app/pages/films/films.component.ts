import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Film } from '../../models/film';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  loading = false;
  error = '';

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.loadFilms();
  }

  loadFilms(): void {
    this.loading = true;
    this.error = '';
    this.filmService.getFilms().subscribe({
      next: (films) => {
        this.films = films;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load films.';
        this.loading = false;
      },
    });
  }
}
