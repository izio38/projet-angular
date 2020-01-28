import {Component, OnInit} from '@angular/core';
import {Hero} from '../dto/heroes';
import {HEROES} from '../heroes.mock';
import {HeroService} from '../hero.service';
import {Observable, observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private selectedHero: Hero = null;

  constructor(private readonly heroService: HeroService) {
  }

  ngOnInit() {
    this.heroes = this.heroService.getHeroes();
    // this.heroes = this.heroService.getHeroes().pipe(
    //   map(heroes => heroes.map((hero) => new Hero(hero.payload.doc.id, hero.name, {
    //     attack: hero.attack,
    //     agility: hero.agility,
    //     strength: hero.strength,
    //     health: hero.health
    //   })))
    // );
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  bulkDelete() {
    this.heroService.bulkDelete();
  }
}
