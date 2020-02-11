import {Injectable} from '@angular/core';
import {Hero} from '../dto/heroes';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Abilities} from '../dto/abilities';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(private readonly db: AngularFirestore) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.db.collection('heroes').snapshotChanges().pipe(
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
            .setAvatarURI(data.avatarURI);
        });
      }),
    );
  }

  getNBetterHeroes(n: number): Observable<Hero[]> {
    return (
      this.getHeroes().pipe(
        map(heroes => heroes.sort((a, b) => b.getTotalAbilityPoints() - a.getTotalAbilityPoints())
          // Get the n first
          .slice(0, n)),
      )
    );
  }

  create(name: string, abilities: Abilities, avatarURI: string): Promise<DocumentReference> {
    return this.db.collection('heroes').add({name, ...abilities, avatarURI});
  }

  bulkDelete(): Subscription {
    return this.db.collection('heroes').get().subscribe((observer) => {
      observer.forEach(async (hero) => {
        await this.db.collection('heroes').doc(hero.id).delete();
      });
    });
  }

  getFromId(id: string): Observable<Hero> {
    return this.db.collection('heroes').doc(id).snapshotChanges().pipe(
      map(hero => {
        const data = hero.payload.data() as any;
        const heroId = hero.payload.id;

        return new Hero(heroId, data.name, {
          strength: data.strength,
          health: data.health,
          attack: data.attack,
          agility: data.agility
        }).setAvatarURI(data.avatarURI);
      }),
    );
  }

  update(hero: Hero): Promise<void> {
    return this.db.collection('heroes').doc(hero.id).update(hero.toFlatJSON());
  }

  delete(hero: Hero): Promise<void> {
    return this.db.collection('heroes').doc(hero.id).delete();
  }
}
