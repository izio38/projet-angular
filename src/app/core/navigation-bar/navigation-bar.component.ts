import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() routes: Array<any> = [];

  constructor(private router: Router) {}
}
