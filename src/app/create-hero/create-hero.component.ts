import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {abilityValidator} from '../shared/ability.validator';
import {HeroService} from '../hero.service';
import {HeroAbilities} from '../dto/heroes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css'],
})
export class CreateHeroComponent implements OnInit {
  heroForm = new FormGroup(
    {
      name: new FormControl('', [Validators.minLength(3)]),
      agility: new FormControl(0, [Validators.min(0), Validators.max(40)]),
      attack: new FormControl(0, [Validators.min(0), Validators.max(40)]),
      health: new FormControl(0, [Validators.min(0), Validators.max(40)]),
      strength: new FormControl(0, [Validators.min(0), Validators.max(40)]),
    },
    { validators: abilityValidator }
  );

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit() {
  }

  async submitForm() {
    const {health, strength, attack, agility}: HeroAbilities = this.heroForm.value;
    await this.heroService.create(this.heroForm.value.name, {health, strength, agility, attack});

    await this.router.navigate(['/heroes']);
  }
}
