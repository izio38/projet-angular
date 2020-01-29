import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {abilityValidator} from '../../shared/ability.validator';
import {HeroService} from '../../hero.service';
import {Hero, HeroAbilities} from '../../dto/heroes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css'],
})
export class CreateHeroComponent implements OnInit {
  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit() {
  }

  async onCreateSubmitted({name, health, strength, agility, attack}) {
    await this.heroService.create(name, {health, strength, agility, attack});

    await this.router.navigate(['/heroes']);
  }
}
