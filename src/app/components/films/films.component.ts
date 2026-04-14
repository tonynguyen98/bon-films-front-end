import {Component, OnInit} from '@angular/core';
import {Film} from 'src/app/models/film';
import {FilmService} from 'src/app/services/film/film.service';

@Component({
  standalone: false,
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  films: Film[];

  constructor(
    private filmService: FilmService,
  ) {
  }

  ngOnInit(): void {
    this.getAllFilms();
  }

  getAllFilms() {
    this.filmService.getAllFilms().subscribe(
      data => {
        this.films = data;
      }
    );
  }

}
