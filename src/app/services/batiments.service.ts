import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import _ from 'underscore';
import { Batiment } from '../models/batiment';
import { InfosBatiments } from '../models/infosBatiments';
import { champsBle, listeBatiments } from '../models/listeBatiments';
import { InitService } from './init.service';


@Injectable({
  providedIn: 'root'
})
export class BatimentsService {
  idPartie: string;
  batiments$: BehaviorSubject<InfosBatiments> = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase,
              private init: InitService) {
    this.init.idPartie$.subscribe(idPartie => {
      this.idPartie = idPartie;
      this.initBatiments();
    });
  }

  getRandomBatiments(): Batiment[] {
    return _.sample(listeBatiments, 12);
  }

  getChampsBle(): Batiment[] {
    return champsBle;
  }

  initBatiments(): void {
    this.db.object('/parties/' + this.idPartie + '/batiments').valueChanges()
      .subscribe((batiments: InfosBatiments) => { this.batiments$.next(batiments); });
  }

  getBatiments(): Observable<InfosBatiments> {
    return this.batiments$.asObservable();
  }

  updateBatiments(batiments: Partial<InfosBatiments>): void {
    this.db.object('/parties/' + this.idPartie + '/batiments').update(batiments);
  }

  updateBatiment(index: number, batiment: Batiment): void {
    this.db.object('/parties/' + this.idPartie + '/batiments/listeBatiments/' + index).update(batiment);
  }

  setBatimentIndisponible(batiment: Batiment): void {
    const index = _.findIndex(this.batiments$.getValue().listeBatiments, { nom: batiment.nom });
    batiment.disponible = false;

    if (index !== -1) {
      this.updateBatiment(index, batiment);
    }
  }

}
