import { Component } from '@angular/core';
import {WeaponService} from '../../services/weapon.service';
import {Weapon} from '../../dto/weapons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create-weapon.component.html',
  styleUrls: ['./create-weapon.component.css']
})
export class CreateWeaponComponent{

  constructor(private readonly weaponService: WeaponService, private readonly router: Router) { }

  async onCreateSubmitted(weaponValues) {
    await this.weaponService.create(Weapon.fromValues(weaponValues));
    await this.router.navigate(['/weapons']);
  }
}
