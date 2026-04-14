import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Review} from 'src/app/models/review';
import {FilmService} from 'src/app/services/film/film.service';

@Component({
  standalone: false,
  selector: 'app-reviews-by-film',
  templateUrl: './reviews-by-film.component.html',
  styleUrls: ['./reviews-by-film.component.scss']
})
export class ReviewsByFilmComponent implements OnInit {

  filmReviews: Review[];

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getAllReviewsByFilm();
  }

  getAllReviewsByFilm() {
    const id = this.route.snapshot.paramMap.get('id');
    this.filmService.getReviewsByFilm(id).subscribe(
      data => {
        this.filmReviews = data;
      }
    );
  }

}
