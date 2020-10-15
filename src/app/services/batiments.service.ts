import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import _ from 'underscore';
import { Batiment } from '../models/batiment';
import { Case } from '../models/case';
import { InfosBatiments } from '../models/infosBatiments';
import { Joueur } from '../models/joueur';
import { JoueurActif } from '../models/joueurActif';
import { champsBle, listeBatiments } from '../models/listeBatiments';
import { CartesService } from './cartes.service';
import { EvenementsService } from './evenements.service';
import { InitService } from './init.service';
import { JoueursService } from './joueurs.service';


@Injectable({
  providedIn: 'root'
})
export class BatimentsService {
  idPartie: string;

  constructor(private db: AngularFireDatabase,
              private init: InitService,
              private joueursS: JoueursService,
              private cartesS: CartesService) {
    this.init.idPartie$.subscribe(idPartie => {
      this.idPartie = idPartie;
    });
  }

  getRandomBatiments() {
    return _.sample(listeBatiments, 12);
  }

  getChampsBle() {
    return champsBle;
  }

  getBatiments() {
    return this.db.object('/parties/' + this.idPartie + '/batiments').valueChanges() as Observable<InfosBatiments>;
  }

  updateBatiments(listeBats: Batiment[], nbChampsBle: number) {
    const batiments = { listeBatiments: listeBats, nbChampsBle };

    this.db.object('/parties/' + this.idPartie + '/batiments').update(batiments);
  }

  updateBatiment(index: number, batiment: Batiment) {
    this.db.object('/parties/' + this.idPartie + '/batiments/listeBatiments/' + index).update(batiment);
  }

  setBatimentIndisponible(listeBats: Batiment[], batiment: Batiment) {
    const index = _.findIndex(listeBats, { nom: batiment.nom });
    batiment.disponible = false;

    if (index !== -1) {
      console.log('index batiment : ', listeBats.indexOf(batiment));
      this.updateBatiment(index, batiment);
    }
  }
}
