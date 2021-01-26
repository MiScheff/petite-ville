import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InitService } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class EvenementsService {
  idPartie: string;

  constructor(private initS: InitService,
              private db: AngularFireDatabase) {
    this.initS.idPartie$.subscribe(id => this.idPartie = id);
  }

  addEvenement(messageEvenement: string) {
    this.db.list('/parties/' + this.idPartie + '/evenements').push(messageEvenement);
  }

  getEvenements(): Observable<string[]> {
    return this.db.object('/parties/' + this.idPartie + '/evenements').valueChanges().pipe(
      switchMap(evenements => {
        const tabEvents = [];
        Object.keys(evenements).forEach((key) => {
          tabEvents.push(evenements[key]);
        });
        return of(tabEvents);
      })
    );
  }

}
