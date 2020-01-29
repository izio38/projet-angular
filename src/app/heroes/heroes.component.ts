import {Component, OnInit} from '@angular/core';
import {Hero} from '../dto/heroes';
import {HeroService} from '../services/hero.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      queryParams: {id: hero.id},
    });
  }

  async deleteHero(hero: Hero) {
    await this.heroService.delete(hero);
    this.snackBar.open('Supprimé avec succès', null, {duration: 1000 * 3, panelClass: ['snackbar-success']});
  }
}
