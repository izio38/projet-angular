import {Component, OnInit} from '@angular/core';
import {Hero} from '../dto/heroes';
import {HEROES} from '../heroes.mock';
import {HeroService} from '../hero.service';
import {Observable, observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Observable<Hero[]>;

  constructor(private readonly heroService: HeroService, private router: Router) {
  }

  ngOnInit() {
    this.heroes = this.heroService.getHeroes();
  }

  bulkDelete() {
    this.heroService.bulkDelete();
  }

  async goToEditHero(hero: Hero) {
    await this.router.navigate(['/hero/edit'], {
      queryParams: { id: hero.id },
    });
  }
}
