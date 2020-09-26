import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDto } from 'src/app/dtos/movie/MovieDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddMovieDto } from 'src/app/dtos/movie/addMovieDto';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  form: FormGroup;
  isToEditMovie = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
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
    this.route.params.subscribe(
      (params: any) => {
        const id = Number(params.id);

        if (id) {
          this.isToEditMovie = true;
          this.form.addControl('id', this.fb.control(id));

          const movieMock = {
            id: 1,
            title: 'título 1',
            director: 'diretor 1',
            genre: 'gênero 1',
            synopsis: 'sinopse 1',
            year: '2019'
          };

          this.form.patchValue(movieMock);
        }
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

      this.routeToListMovies();
    } else {
      this.form.markAllAsTouched();
    }
  }

  add(movie: AddMovieDto): void {
    console.table('add: ' + JSON.stringify(movie));
  }

  update(movie: MovieDto): void {
    console.log('update: ' + JSON.stringify(movie));
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
