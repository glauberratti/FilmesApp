import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMoviesComponent } from './list-movies/list-movies.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

const routes: Routes = [
  { path: '', component: ListMoviesComponent },
  { path: 'new', component: MovieFormComponent},
  { path: 'info/:id', component: MovieFormComponent},
  { path: 'edit/:id', component: MovieFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
