import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { Joueur } from '../models/joueur';
import { JoueurActif } from '../models/joueurActif';
import { EvenementsService } from './evenements.service';
import { InitService } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class JoueursService {
  idPartie: string;

  private joueursSrc = new BehaviorSubject([]);
  joueurs$ = this.joueursSrc.asObservable();

  constructor(private db: AngularFireDatabase,
              private init: InitService,
              private evenementsS: EvenementsService) {
    this.init.idPartie$.subscribe(idPartie => {
      this.idPartie = idPartie;
      this.getJoueurs();
    });
  }

  addJoueur(idJoueur: string, joueur: Joueur, messageEvenement: string): void {
    this.updateJoueur(idJoueur, joueur);
    this.evenementsS.addEvenements(messageEvenement);
  }

  getJoueurs() {
    this.db.object('/parties/' + this.idPartie + '/joueurs').valueChanges().subscribe((joueurs: Joueur[]) => {
      console.log('joueurServiceGetJoueur', joueurs);
      this.joueursSrc.next(joueurs);
    });
  }

  updateJoueurActif(donnees: Partial<JoueurActif>) {
    this.db.object('/parties/' + this.idPartie + '/joueurActif').update(donnees);
  }

  updateJoueur(idJoueur: string, donnees: Partial<Joueur>) {
    this.db.object('/parties/' + this.idPartie + '/joueurs/' + idJoueur).update(donnees);
  }


}
