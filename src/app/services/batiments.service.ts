import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import _ from 'underscore';
import { Batiment } from '../models/batiment';
import { InfosBatiments } from '../models/infosBatiments';
import { Joueur } from '../models/joueur';
import { champsBle, listeBatiments } from '../models/listeBatiments';
import { CartesService } from './cartes.service';
import { InitService } from './init.service';
import { JoueursService } from './joueurs.service';


@Injectable({
  providedIn: 'root'
})
export class BatimentsService {
  idPartie: string;

  constructor(private db: AngularFireDatabase,
              private init: InitService,
              private joueursS: JoueursService) {
    this.init.idPartie$.subscribe(idPartie => {
      this.idPartie = idPartie;
    });
  }

  getRandomBatiments(): Batiment[] {
    return _.sample(listeBatiments, 12);
  }

  getChampsBle(): Batiment[] {
    return champsBle;
  }

  getBatiments(): Observable<InfosBatiments> {
    return this.db.object('/parties/' + this.idPartie + '/batiments').valueChanges() as Observable<InfosBatiments>;
  }

  updateBatiments(batiments: Partial<InfosBatiments>): void {
    this.db.object('/parties/' + this.idPartie + '/batiments').update(batiments);
  }

  updateBatiment(index: number, batiment: Batiment): void {
    this.db.object('/parties/' + this.idPartie + '/batiments/listeBatiments/' + index).update(batiment);
  }

  setBatimentIndisponible(listeBats: Batiment[], batiment: Batiment): void {
    const index = _.findIndex(listeBats, { nom: batiment.nom });
    batiment.disponible = false;

    if (index !== -1) {
      this.updateBatiment(index, batiment);
    }
  }

}
