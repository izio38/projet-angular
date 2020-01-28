import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {HomeComponent} from '../../home/home.component';
import {HeroesComponent} from '../../heroes/heroes.component';
import {CreateHeroComponent} from '../../heroes/create-hero/create-hero.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @ViewChild('commandbarSidenav', {static: true})
  public sidenav: MatSidenav;
  routes = [
    {path: '/', name: 'Home', icon: 'house'},
    {path: 'heroes', name: 'Les héros', icon: 'view_list'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
