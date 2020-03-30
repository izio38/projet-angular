import { Injectable } from '@angular/core';
import { Hero } from '../dto/heroes';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Abilities } from '../dto/abilities';
import { Sort } from '@angular/material/sort';
import { path } from 'ramda';

interface IComparator {
  keyPath: string[];
  isFunction: boolean;
  direction: string | 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private readonly db: AngularFirestore) {}

  getHeroes(sort?: Sort): Observable<Hero[]> {
    const sortParameter = sort ? sort : { active: 'total', direction: 'desc' };

    return this.db
      .collection('heroes')
      .snapshotChanges()
      .pipe(
        map(heroes => {
          return heroes.map((hero: DocumentChangeAction<any>) => {
            const data = hero.payload.doc.data();
            const id = hero.payload.doc.id;
            const referencePath = hero.payload.doc.ref.path;
            return new Hero(id, data.name, {
              health: data.health,
              strength: data.strength,
              agility: data.agility,
              attack: data.attack,
            })
              .setDocumentReferencePath(referencePath)
              .setAvatarURI(data.avatarURI)
              .setWeaponId(data.weaponId);
          });
        }),
        // Sort
        map(heroes => {
          const sortFunction = (a: Hero, b: Hero) => {
            const comparator: IComparator = {
              keyPath: [sortParameter.active],
              isFunction: false,
              direction: sortParameter.direction,
            };

            // If it's the total Ability points
            if (sortParameter.active === 'total') {
              comparator.keyPath = ['getTotalAbilityPoints'];
              comparator.isFunction = true;
            }

            // If it's one of the ability
            if (
              sortParameter.active === 'agility' ||
              sortParameter.active === 'health' ||
              sortParameter.active === 'strength' ||
              sortParameter.active === 'attack'
            ) {
              comparator.keyPath = ['abilities', sortParameter.active];
            }

            // Get the actual object value
            const keyValueA = path(comparator.keyPath, a);
            const keyValueB = path(comparator.keyPath, b);

            // If the sort is ascending
            if (comparator.direction === 'asc') {
              // If the sort is based on a method
              if (comparator.isFunction) {
                return (
                  (a[comparator.keyPath[0]] as () => number)() -
                  (b[comparator.keyPath[0]] as () => number)()
                );
              } else {
                return (keyValueA as number) - (keyValueB as number);
              }
              // If the sort is descending
            } else {
              if (comparator.isFunction) {
                return (
                  (b[comparator.keyPath[0]] as () => number)() -
                  (a[comparator.keyPath[0]] as () => number)()
                );
              } else {
                return (keyValueB as number) - (keyValueA as number);
              }
            }
          };
          return heroes.sort(sortFunction);
        })
      );
  }

  getNBetterHeroes(n: number): Observable<Hero[]> {
    return this.getHeroes().pipe(
      map(heroes =>
        heroes
          .sort((a, b) => b.getTotalAbilityPoints() - a.getTotalAbilityPoints())
          // Get the n first
          .slice(0, n)
      )
    );
  }

  create(
    name: string,
    abilities: Abilities,
    avatarURI: string,
    weaponId: string
  ): Promise<DocumentReference> {
    return this.db
      .collection('heroes')
      .add({ name, ...abilities, avatarURI, weaponId });
  }

  bulkDelete(): Subscription {
    return this.db
      .collection('heroes')
      .get()
      .subscribe(observer => {
        observer.forEach(async hero => {
          await this.db
            .collection('heroes')
            .doc(hero.id)
            .delete();
        });
      });
  }

  getFromId(id: string): Observable<Hero> {
    return this.db
      .collection('heroes')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map(hero => {
          const data = hero.payload.data() as any;
          const heroId = hero.payload.id;

          return new Hero(heroId, data.name, {
            strength: data.strength,
            health: data.health,
            attack: data.attack,
            agility: data.agility,
          })
            .setAvatarURI(data.avatarURI)
            .setWeaponId(data.weaponId);
        })
      );
  }

  update(hero: Hero): Promise<void> {
    return this.db
      .collection('heroes')
      .doc(hero.id)
      .update(hero.toFlatJSON());
  }

  delete(hero: Hero): Promise<void> {
    return this.db
      .collection('heroes')
      .doc(hero.id)
      .delete();
  }
}
