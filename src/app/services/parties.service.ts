import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { InfosPartie } from '../models/infosPartie';
import { Joueur } from '../models/joueur';
import { Partie } from '../models/partie';
import { BatimentsService } from './batiments.service';
import { CartesService } from './cartes.service';
import { EvenementsService } from './evenements.service';
import { InitService } from './init.service';
import { JoueursService } from './joueurs.service';

@Injectable({
  providedIn: 'root'
})
export class PartiesService {
  idPartie: string;
  partie: Partie;

  constructor(private db: AngularFireDatabase,
              private cartesS: CartesService,
              private batimentsS: BatimentsService,
              private evenementsS: EvenementsService,
              private joueursS: JoueursService,
              private initS: InitService) {

    this.initS.idPartie$.subscribe(idPartie => {
      this.idPartie = idPartie;
      this.getInfosPartie();
    });
  }

  async createPartie(idJoueur) {
    const joueur = new Joueur(localStorage.getItem('nomUser'));
    const carte = this.cartesS.initCarte();
    const batiments = this.batimentsS.getRandomBatiments();

    return await this.db.list('/parties').push(new Partie(idJoueur, carte, batiments, joueur));
  }

  getInfosPartie(): Observable<InfosPartie> {
    return this.db.object('/parties/' + this.idPartie + '/infosPartie').valueChanges() as Observable<InfosPartie>;
  }

  commencerPartie(idJoueurs: string[], parametres: {nbMaxOuvriers, nbMaxBatiments}, messageEvenement: string): void {
    this.db.object('/parties/' + this.idPartie + '/infosPartie').update({
      dateDebut: Date.now(),
      manche: 1
    });
    this.db.object('/parties/' + this.idPartie + '/batiments').update({
      nbMaxBatiments: parametres.nbMaxBatiments
    });
    // Pas moyen d'actualiser tous les joueurs d'un coup avec Firebase, donc on fait une requête par
    // joueur à actualiser...
    idJoueurs.forEach(idJoueur => {
      this.joueursS.updateJoueur(idJoueur, { ouvriers: parametres.nbMaxOuvriers });
    });

    this.evenementsS.addEvenements(messageEvenement);
  }

}
