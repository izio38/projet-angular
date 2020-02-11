import { Component } from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css'],
})
export class CreateHeroComponent {
  constructor(private heroService: HeroService, private router: Router) {}

  async onCreateSubmitted({name, health, strength, agility, attack, avatarURI}) {
    await this.heroService.create(name, {health, strength, agility, attack}, avatarURI);

    await this.router.navigate(['/heroes']);
  }
}
