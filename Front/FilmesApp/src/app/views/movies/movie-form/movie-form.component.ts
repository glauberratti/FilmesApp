import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  isToEditMovie = false;
  movie: any = {};
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: any) => {
        const id = params.id;

        if (id) {
          this.isToEditMovie = true;
        }
      }
    )
    .unsubscribe();
  }

  save(): void {
    // enviar pra API.
    this.routeToListMovies();
  }

  routeToListMovies(): void {
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}
