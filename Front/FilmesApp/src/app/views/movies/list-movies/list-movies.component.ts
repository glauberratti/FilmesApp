import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  moviesMock: Movie[] = [
    {
      id: 1,
      title: 'título 1',
      director: 'diretor 1',
      genre: 'gênero 1',
      synopsis: 'sinopse 1',
      year: '2019'
    },
    {
      id: 2,
      title: 'título 2',
      director: 'diretor 2',
      genre: 'gênero 2',
      synopsis: 'sinopse 2',
      year: '2020'
    },
  ];
  displayedColumns: string[] = [
    'title',
    'director',
    'genre',
    'synopsis',
    'year',
    'edit',
    'remove'
  ];
  dataSource = this.moviesMock;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  edit(id: number): void {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  remove(id: number): void {

  }

  new(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
