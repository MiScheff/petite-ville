import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Joueur } from '../models/joueur';
import { JoueurActif } from '../models/joueurActif';
import { EvenementsService } from './evenements.service';
import { InitService } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class JoueursService {
  idPartie: string;

  constructor(private db: AngularFireDatabase,
              private init: InitService,
              private evenementsS: EvenementsService) {
    this.init.idPartie$.subscribe(idPartie => {
      this.idPartie = idPartie;
      this.getJoueurs();
      this.getJoueurActif();
    });
  }

  addJoueur(idJoueur: string, joueur: Joueur, messageEvenement: string): void {
    this.updateJoueur(idJoueur, joueur);
    this.evenementsS.addEvenements(messageEvenement);
  }

  getJoueurs() {
    return this.db.object('/parties/' + this.idPartie + '/joueurs').valueChanges() as Observable<Joueur[]>;
  }

  getJoueurActif() {
    return this.db.object('/parties/' + this.idPartie + '/joueurActif').valueChanges() as Observable<JoueurActif>;
  }

  updateJoueurActif(donnees: Partial<JoueurActif>) {
    this.db.object('/parties/' + this.idPartie + '/joueurActif').update(donnees);
  }

  updateJoueur(idJoueur: string, donnees: Partial<Joueur>) {
    this.db.object('/parties/' + this.idPartie + '/joueurs/' + idJoueur).update(donnees);
  }


}
