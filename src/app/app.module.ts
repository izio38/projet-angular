import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroesComponent } from './heroes/heroes.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from './services/hero.service';
import { EditHeroComponent } from './heroes/edit-hero/edit-hero.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CreateHeroComponent } from './heroes/create-hero/create-hero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './core/navigation-bar/navigation-bar.component';
import { SideNavComponent } from './core/side-nav/side-nav.component';
import {HeroFormComponent} from './heroes/form/hero-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { FlexLayoutModule } from '@angular/flex-layout';
import { WeaponsComponent } from './weapons/weapons.component';
import { CreateWeaponComponent } from './weapons/create/create-weapon.component';
import { EditWeaponComponent } from './weapons/edit/edit-weapon.component';
import { FormWeaponComponent } from './weapons/form/form-weapon.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HomeComponent,
    EditHeroComponent,
    CreateHeroComponent,
    HeroFormComponent,
    NavigationBarComponent,
    SideNavComponent,
    WeaponsComponent,
    CreateWeaponComponent,
    EditWeaponComponent,
    FormWeaponComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent],
})
export class AppModule {}
