import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDto } from 'src/app/dtos/movie/movieDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateMovieDto } from 'src/app/dtos/movie/updateMovieDto';
import { MovieService } from 'src/app/services/movie.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  form: FormGroup;
  isToEditMovie = false;
  isToConsultMovie = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private movieService: MovieService
  ) {
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(100)]],
      director: [null, [Validators.required, Validators.maxLength(100)]],
      genre: [null, [Validators.required, Validators.maxLength(50)]],
      synopsis: [null, Validators.maxLength(500)],
      year: [null, [Validators.pattern('^[0-9]*$'), Validators.minLength(4), Validators.maxLength(4)]],
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(
      (url: any) => {
        if (url[0].path === 'info') {
          this.isToConsultMovie = true;
          this.form.disable();
        } else if (url[0].path === 'edit') {
          this.isToEditMovie = true;
        }

        this.route.params.subscribe(
          (params: any) => {
            const id = Number(params.id);

            if (this.isToEditMovie) {
              this.form.addControl('id', this.fb.control(id));
            }

            if (id) {
              this.movieService.getById(id)
              .pipe(take(1))
              .subscribe((result: MovieDto) => {
                this.form.patchValue(result);
              });
            }
          }
        )
        .unsubscribe();
      }
    )
    .unsubscribe();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const movie = this.form.value;

      if (this.isToEditMovie){
        this.update(movie);
      } else {
        this.add(movie);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  add(movie: MovieDto): void {
    this.movieService.add(movie)
    .pipe(take(1))
    .subscribe((res: any) => {
      this.routeToListMovies();
    });
  }

  update(movie: UpdateMovieDto): void {
    this.movieService.update(movie)
    .pipe(take(1))
    .subscribe(res => {
      this.routeToListMovies();
    });
  }

  routeToListMovies(): void {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  validateIsFieldRequired(fieldName: string): boolean {
    return this.form.get(fieldName)?.hasError('required') &&
    this.form.get(fieldName)?.touched;
  }

  validateYear(): boolean {
    return this.form.get('year')?.touched &&
    (this.form.get('year')?.hasError('pattern') ||
    this.form.get('year')?.hasError('minlength'));
  }
}
