import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {Hero} from '../../dto/heroes';
import {switchMap} from 'rxjs/operators';
import {HeroService} from '../../hero.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css'],
})
export class EditHeroComponent implements OnInit {
  hero$: Observable<Hero>;
  hero: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService) {}

  ngOnInit() {
    this.hero$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) =>
        this.heroService.getFromId(params.get('id')))
    );

    this.hero$.subscribe(hero => {
      this.hero = hero;
    });
  }
}
