import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Hero} from '../../dto/heroes';
import {switchMap} from 'rxjs/operators';
import {HeroService} from '../../services/hero.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css'],
})
export class EditHeroComponent implements OnInit {
  hero$: Observable<Hero>;
  hero: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.hero$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) =>
        this.heroService.getFromId(params.get('id')))
    );

    this.hero$.subscribe(hero => {
      this.hero = hero;
    });
  }

  async onEditRequested({name, agility, health, strength, attack, avatarURI}) {
    this.hero.setName(name)
      .setAgility(agility)
      .setHealth(health)
      .setStrength(strength)
      .setAttack(attack)
      .setAvatarURI(avatarURI);

    await this.heroService.update(this.hero);
    this.snackBar.open('Modifié avec succès', 'Retourner à la liste', {duration: 1000 * 5, panelClass: ['snackbar-success']})
      .onAction()
      .subscribe((observer) => {
        this.router.navigate(['/heores']);
      });

  }
}
