import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { abilityValidator } from './abilities.validator';
import { Weapon } from '../../dto/weapons';

@Component({
  selector: 'app-form-weapon',
  templateUrl: './form-weapon.component.html',
  styleUrls: ['./form-weapon.component.css'],
})
export class FormWeaponComponent implements OnInit {
  @Input() isCreationMode: boolean;
  @Input() weapon: Weapon = null;

  @Output() createRequested: EventEmitter<any> = new EventEmitter();
  @Output() editRequested: EventEmitter<any> = new EventEmitter();

  weaponForm: FormGroup;

  constructor() {}

  ngOnInit() {
    if (this.isCreationMode) {
      this.weaponForm = new FormGroup(
        {
          name: new FormControl('', [Validators.minLength(3)]),
          agility: new FormControl(-1, [Validators.min(-5), Validators.max(5)]),
          attack: new FormControl(-1, [Validators.min(-5), Validators.max(5)]),
          health: new FormControl(1, [Validators.min(-5), Validators.max(5)]),
          strength: new FormControl(1, [Validators.min(-5), Validators.max(5)]),
        },
        { validators: abilityValidator }
      );
    } else {
      this.weaponForm = new FormGroup(
        {
          name: new FormControl(this.weapon.name, [Validators.minLength(3)]),
          agility: new FormControl(this.weapon.abilities.agility, [
            Validators.min(-5),
            Validators.max(5),
          ]),
          attack: new FormControl(this.weapon.abilities.attack, [
            Validators.min(-5),
            Validators.max(5),
          ]),
          health: new FormControl(this.weapon.abilities.health, [
            Validators.min(-5),
            Validators.max(5),
          ]),
          strength: new FormControl(this.weapon.abilities.strength, [
            Validators.min(-5),
            Validators.max(5),
          ]),
        },
        { validators: abilityValidator }
      );
    }
  }

  submitForm() {
    const { name, agility, health, attack, strength } = this.weaponForm.value;

    if (this.isCreationMode) {
      this.createRequested.emit({ name, agility, health, attack, strength });
    } else {
      this.editRequested.emit({ name, agility, health, attack, strength });
    }
  }
}
