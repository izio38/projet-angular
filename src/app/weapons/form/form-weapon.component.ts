import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hero, HeroAbilities} from '../../dto/heroes';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abilityValidator} from '../../heroes/form/ability.validator';
import {Weapon} from '../../dto/weapons';

@Component({
  selector: 'app-form-weapon',
  templateUrl: './form-weapon.component.html',
  styleUrls: ['./form-weapon.component.css']
})
export class FormWeaponComponent implements OnInit {
  @Input() isCreationMode: boolean;
  @Input() weapon: Weapon = null;

  @Output() createRequested: EventEmitter<any> = new EventEmitter();
  @Output() editRequested: EventEmitter<any> = new EventEmitter();

  weaponForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    if (this.isCreationMode) {
      this.weaponForm = new FormGroup(
        {
          name: new FormControl('', [Validators.minLength(3)]),
        }
      );
    } else {
      this.weaponForm = new FormGroup(
        {
          name: new FormControl(this.weapon.name, [Validators.minLength(3)]),
        }
      );
    }
  }

  submitForm() {
    const {name} = this.weaponForm.value;

    if (this.isCreationMode) {
      this.createRequested.emit({name});
    } else {
      this.editRequested.emit({name});
    }
  }

}
