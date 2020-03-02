import { Component, OnInit } from '@angular/core';
import { Hero } from '../dto/heroes';
import { HeroService } from '../services/hero.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  betterHeroes: Observable<Hero[]>;

  constructor(
    private readonly heroService: HeroService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.betterHeroes = this.heroService.getNBetterHeroes(3);
  }

  async goToEditHero(hero: Hero) {
    await this.router.navigate(['/hero/edit'], {
      queryParams: { id: hero.id },
    });
  }
}
