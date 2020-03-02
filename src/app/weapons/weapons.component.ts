import { Component, OnInit } from '@angular/core';
import { WeaponService } from '../services/weapon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Weapon } from '../dto/weapons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css'],
})
export class WeaponsComponent implements OnInit {
  weapons$: Observable<Weapon[]>;

  constructor(
    private readonly weaponService: WeaponService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.weapons$ = this.weaponService.getWeapons();
  }

  bulkDelete() {
    return this.weaponService.bulkDelete().add(() => {
      this.snackBar.open('Suppression de masse effectuée avec succès', null, {
        duration: 1000 * 5,
        panelClass: ['snackbar-success'],
      });
    });
  }

  async goToEditWeapon(weapon: Weapon) {
    await this.router.navigate(['/weapon/edit'], {
      queryParams: { id: weapon.id },
    });
  }

  async deleteWeapon(weapon: Weapon) {
    await this.weaponService.delete(weapon);
    this.snackBar.open('Supprimé avec succès', null, {
      duration: 1000 * 3,
      panelClass: ['snackbar-success'],
    });
  }
}
