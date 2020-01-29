import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abilityValidator} from '../../shared/ability.validator';
import {Hero, HeroAbilities} from '../../dto/heroes';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  @Input() isCreationMode: boolean;
  @Input() hero: Hero;

  @Output() createRequested: EventEmitter<any> = new EventEmitter();
  @Output() editRequested: EventEmitter<any> = new EventEmitter();

  heroForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    if (this.isCreationMode) {
      this.heroForm = new FormGroup(
        {
          name: new FormControl('', [Validators.minLength(3)]),
          agility: new FormControl(1, [Validators.min(1), Validators.max(40)]),
          attack: new FormControl(1, [Validators.min(1), Validators.max(40)]),
          health: new FormControl(1, [Validators.min(1), Validators.max(40)]),
          strength: new FormControl(1, [Validators.min(1), Validators.max(40)]),
        },
        {validators: abilityValidator}
      );
    } else {
      this.heroForm = new FormGroup(
        {
          name: new FormControl(this.hero.name, [Validators.minLength(3)]),
          agility: new FormControl(this.hero.abilities.agility, [Validators.min(1), Validators.max(40)]),
          attack: new FormControl(this.hero.abilities.attack, [Validators.min(1), Validators.max(40)]),
          health: new FormControl(this.hero.abilities.health, [Validators.min(1), Validators.max(40)]),
          strength: new FormControl(this.hero.abilities.strength, [Validators.min(1), Validators.max(40)]),
        },
        {validators: abilityValidator}
      );
    }

    this.heroForm.valueChanges.subscribe((values) => {
        this.hero.setAttack(values.attack)
          .setStrength(values.strength)
          .setHealth(values.health)
          .setAgility(values.agility);
    });

  }

  async submitForm() {
    const {health, strength, attack, agility}: HeroAbilities = this.heroForm.value;

    if (this.isCreationMode) {
      this.createRequested.emit({health, strength, attack, agility, name: this.heroForm.value.name});
    } else {
      this.editRequested.emit({health, strength, attack, agility, name: this.heroForm.value.name});
    }
  }

}
