import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../dto/heroes';
import { Weapon } from '../../dto/weapons';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeaponService } from '../../services/weapon.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-weapon.component.html',
  styleUrls: ['./edit-weapon.component.css'],
})
export class EditWeaponComponent implements OnInit {
  weapon$: Observable<Weapon>;
  weapon: Weapon;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private readonly weaponService: WeaponService
  ) {}

  ngOnInit() {
    this.weapon$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        return this.weaponService.getFromId(params.get('id'));
      })
    );

    this.weapon$.subscribe(weapon => {
      this.weapon = weapon;
    });
  }

  async onEditRequested(weaponValues: any) {
    this.weapon
      .setName(weaponValues.name)
      .setAgility(weaponValues.agility)
      .setAttack(weaponValues.attack)
      .setHealth(weaponValues.health)
      .setAvatarURI(weaponValues.avatarURI)
      .setStrength(weaponValues.strength);
    await this.weaponService.update(this.weapon);

    this.snackBar
      .open('Modifié avec succès', 'Retourner à la liste', {
        duration: 1000 * 5,
        panelClass: ['snackbar-success'],
      })
      .onAction()
      .subscribe(observer => {
        this.router.navigate(['/weapons']);
      });
  }
}
