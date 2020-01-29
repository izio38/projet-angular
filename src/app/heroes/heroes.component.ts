import {Component, OnInit} from '@angular/core';
import {Hero} from '../dto/heroes';
import {HEROES} from '../heroes.mock';
import {HeroService} from '../hero.service';
import {Observable, observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Observable<Hero[]>;

  constructor(private readonly heroService: HeroService, private router: Router, private snackBar: MatSnackBar) {
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

  async deleteHero(hero: Hero) {
    await this.heroService.delete(hero);
    this.snackBar.open("Supprimé avec succès", null, {duration: 1000 * 3, panelClass: ['snackbar-success']})
  }
}
