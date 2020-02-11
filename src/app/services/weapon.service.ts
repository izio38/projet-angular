import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Weapon} from '../dto/weapons';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(private readonly db: AngularFirestore) {
  }

  getWeapons(): Observable<Weapon[]> {
    return this.db.collection('weapons').snapshotChanges().pipe(
      map(weapons => {
        return weapons.map((weapon: any) => {
          const data = weapon.payload.doc.data();
          const weaponId = weapon.payload.doc.id;
          return new Weapon(weaponId, data.name, {
            attack: data.attack,
            strength: data.strength,
            health: data.strength,
            agility: data.agility
          });
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
    return this.db.collection('weapons').add(weapon.toFlatJSON());
  }

  bulkDelete(): Subscription {
    return this.db.collection('weapons').get().subscribe((observer) => {
      observer.forEach(async (weapon) => {
        await this.db.collection('weapons').doc(weapon.id).delete();
      });
    });
  }

  getFromId(id: string): Observable<Weapon> {
    return this.db.collection('weapons').doc(id).snapshotChanges().pipe(
      map(weapon => {
        const data = weapon.payload.data() as any;
        const weaponId = weapon.payload.id;
        return new Weapon(weaponId, data.name, {agility: data.agility, health: data.health, strength: data.strength, attack: data.attack});
      }),
    );
  }

  update(weapon: Weapon): Promise<void> {
    return this.db.collection('weapons').doc(weapon.id).update(weapon.toFlatJSON());
  }

  delete(weapon: Weapon): Promise<void> {
    return this.db.collection('weapons').doc(weapon.id).delete();
  }
}
