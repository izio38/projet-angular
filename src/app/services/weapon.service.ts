import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Hero, HeroAbilities} from '../dto/heroes';
import {Observable, Subscription} from 'rxjs';
import {Weapon} from '../dto/weapons';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(private readonly db: AngularFirestore) { }

  getWeapons(): Observable<Weapon[]> {
    return this.db.collection('weapons').snapshotChanges().pipe(
      map(weapons => {
        return weapons.map((weapon: any) => {
          const data = weapon.payload.doc.data();
          const weaponId = weapon.payload.doc.id;
          return new Weapon(weaponId, data.name);
        });
      }),
    );
  }

  getNBetterWeapons(n: number): Observable<Weapon[]> {
    return (
      this.getWeapons().pipe(
        map(weapons => weapons.sort()
          // Get the n first
          .slice(0, n)),
      )
    );
  }

  create(weapon: Weapon): Promise<DocumentReference> {
    return this.db.collection('weapons').add({
      name: weapon.name,
    });
  }

  bulkDelete(): Subscription {
    return this.db.collection('weapons').get().subscribe((observer) => {
      observer.forEach(async (weapon) => {
        await this.db.collection('heroes').doc(weapon.id).delete();
      });
    });
  }

  getFromId(id: string): Observable<Weapon> {
    return this.db.collection('weapons').doc(id).snapshotChanges().pipe(
      map(weapon => {
        const data = weapon.payload.data() as any;
        const weaponId = weapon.payload.id;

        return new Weapon(weaponId, data.name);
      }),
    );
  }

  update(weapon: Weapon): Promise<void> {
    console.log(weapon)
    return this.db.collection('weapons').doc(weapon.id).update(weapon.toFlatJSON());
  }

  delete(weapon: Weapon): Promise<void> {
    return this.db.collection('weapons').doc(weapon.id).delete();
  }
}