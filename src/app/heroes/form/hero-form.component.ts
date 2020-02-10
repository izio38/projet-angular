import {Component, EventEmitter, Input, OnInit, AfterViewInit, Output, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {abilityValidator} from './ability.validator';
import {Hero} from '../../dto/heroes';
import {Abilities} from '../../dto/abilities';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit, AfterViewInit {

  @Input() isCreationMode: boolean;
  @Input() hero: Hero = null;

  @Output() createRequested: EventEmitter<any> = new EventEmitter();
  @Output() editRequested: EventEmitter<any> = new EventEmitter();

  heroForm: FormGroup;

  constructor(private readonly renderer: Renderer2) {}

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
      if (this.heroForm.valid) {
        if (!this.hero) {
          this.hero = new Hero('', values.name, {
            agility: values.agility,
            strength: values.strength,
            health: values.health,
            attack: values.attack
          });
        }
        this.hero.setAttack(values.attack)
          .setStrength(values.strength)
          .setHealth(values.health)
          .setAgility(values.agility);
      }
    });
  }

  ngAfterViewInit(): void {
    // This causes error but it could be great to have it in a working state
    // this.renderer.selectRootElement('#nameInput').focus();
  }

  async submitForm() {
    const {health, strength, attack, agility}: Abilities = this.heroForm.value;

    if (this.isCreationMode) {
      this.createRequested.emit({health, strength, attack, agility, name: this.heroForm.value.name});
    } else {
      this.editRequested.emit({health, strength, attack, agility, name: this.heroForm.value.name});
    }
  }

}
