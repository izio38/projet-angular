import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HomeComponent } from './home/home.component';
import { EditHeroComponent } from './heroes/edit-hero/edit-hero.component';
import { CreateHeroComponent } from './heroes/create-hero/create-hero.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { CreateWeaponComponent } from './weapons/create/create-weapon.component';
import { EditWeaponComponent } from './weapons/edit/edit-weapon.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'hero/edit', component: EditHeroComponent },
  { path: 'hero/create', component: CreateHeroComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'weapon/create', component: CreateWeaponComponent },
  { path: 'weapon/edit', component: EditWeaponComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
