import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../dto/heroes';
import { HeroService } from '../services/hero.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';

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
  dataSource$: Observable<MatTableDataSource<Hero>>;
  dataSource: MatTableDataSource<Hero>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly heroService: HeroService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.dataSource$ = this.heroService.getHeroes().pipe(
      map(heroes => {
        return new MatTableDataSource(heroes);
      })
    );

    this.dataSource$.subscribe(dataSource => {
      this.dataSource = dataSource;
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(async sort => {
      this.dataSource$ = this.heroService.getHeroes(sort).pipe(
        map(heroes => {
          return new MatTableDataSource(heroes);
        })
      );

      this.dataSource$.subscribe(dataSource => {
        this.dataSource.data = dataSource.data;
      });
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

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
