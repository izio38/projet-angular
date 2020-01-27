import { Injectable } from '@angular/core';
import {Hero, HeroAbilities} from './dto/heroes';
import { HEROES } from './heroes.mock';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes: Hero[] = HEROES;
  constructor(private readonly db: AngularFirestore) {}

  getHeroes(): Observable<any> {
    return this.db.collection('heroes').snapshotChanges().pipe(
      map(heroes => {
        return heroes.map((hero: any) => {
          console.log(hero )
          const data = hero.payload.data();
          const id = hero.payload.id;
        });
      })
    );

    // return this.db.collection('heroes').valueChanges();
  }

  getNBetterHeroes(n: number) {
    return (
      this.heroes
        // Deep copy
        .slice(0, this.heroes.length)
        .sort((a, b) => b.getTotalAbilityPoints() - a.getTotalAbilityPoints())
        // Get the n first
        .slice(0, n)
    );
  }

  create(name: string, abilities: HeroAbilities) {
    return this.db.collection('heroes').add({name, ...abilities});
  }

  bulkDelete() {
    return this.db.collection('heroes').get().subscribe((observer) => {
        observer.forEach(async (hero) => {
          await this.db.collection('heroes').doc(hero.id).delete();
        });
    });
  }
}
