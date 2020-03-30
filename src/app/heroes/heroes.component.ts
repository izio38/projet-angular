import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../dto/heroes';
import { HeroService } from '../services/hero.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'avatarURI',
    'name',
    'health',
    'agility',
    'attack',
    'strength',
    'total',
    'actions',
  ];
  heroes$: Observable<Hero[]>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly heroService: HeroService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.heroes$ = this.heroService.getHeroes();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(sort => {
      console.log(sort);
      this.heroes$ = this.heroService.getHeroes(sort);
    });
  }

  bulkDelete() {
    this.heroService.bulkDelete().add(() => {
      this.snackBar.open('Suppression de masse effectuée avec succès', null, {
        duration: 1000 * 5,
        panelClass: ['snackbar-success'],
      });
    });
  }

  async goToEditHero(hero: Hero) {
    await this.router.navigate(['/hero/edit'], {
      queryParams: { id: hero.id },
    });
  }

  async deleteHero(hero: Hero) {
    await this.heroService.delete(hero);
    this.snackBar.open('Supprimé avec succès', null, {
      duration: 1000 * 3,
      panelClass: ['snackbar-success'],
    });
  }
}
