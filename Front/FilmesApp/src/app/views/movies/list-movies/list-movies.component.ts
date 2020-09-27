import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDto } from 'src/app/dtos/movie/movieDto';
import { MovieService } from 'src/app/services/movie.service';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  movies: MovieDto[];
  // dataSource: MatTableDataSource<MovieDto[]>;
  dataSource: any;
  displayedColumns: string[] = [
    'title',
    'director',
    'genre',
    'edit',
    'remove'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getAll()
    .pipe(take(1))
    .subscribe((result: MovieDto[]) => {
      this.movies = result;
      this.dataSource = new MatTableDataSource(this.movies);
    });
  }

  new(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  edit(id: number): void {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  askToRemove(id: number): void {
    if (confirm('Tem certeza que deseja excluir este filme?')) {
      this.remove(id);
    }
  }

  remove(id: number): void {
    this.movieService.remove(id)
    .pipe(take(1))
    .subscribe((res => {
      this.getMovies();
    }));
  }

  applyFilterByTitle(event: Event): void {
    this.setFilterPredicateByTitle();
    this.applyFilter(event);
  }

  applyFilterByGenre(event: Event): void {
    this.setFilterPredicateByGenre();
    this.applyFilter(event);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setFilterPredicateByTitle(): void {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.title.toLowerCase().includes(filter);
    };
  }

  setFilterPredicateByGenre(): void {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.genre.toLowerCase().includes(filter);
    };
  }
}
