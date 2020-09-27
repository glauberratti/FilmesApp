import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDto } from '../dtos/movie/movieDto';
import { UpdateMovieDto } from '../dtos/movie/updateMovieDto';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpService<MovieDto, UpdateMovieDto>
  ) {  }

  getById(id: number): Observable<MovieDto> {
    return this.http.getById('movies', id);
  }

  getAll(): Observable<MovieDto[]> {
    return this.http.getAll('movies');
  }

  add(movie: MovieDto): Observable<object> {
    return this.http.add('movies', movie);
  }

  update(movie: UpdateMovieDto): Observable<object> {
    return this.http.update('movies', movie);
  }

  remove(id: number): Observable<object> {
    return this.http.remove('movies', id);
  }
}
