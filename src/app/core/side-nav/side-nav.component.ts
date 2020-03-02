import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  routes = [
    { path: '/', name: 'Home', icon: 'house' },
    { path: 'heroes', name: 'Les héros', icon: 'view_list' },
    { path: 'weapons', name: 'Les Armes', icon: 'view_list' },
  ];

  constructor() {}
}
