import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Joueur } from '../models/joueur';
import { Partie } from '../models/partie';
import { BatimentsService } from './batiments.service';
import { CartesService } from './cartes.service';

@Injectable({
  providedIn: 'root'
})
export class PartiesService {
  constructor(private db: AngularFireDatabase,
              private cartesS: CartesService,
              private batimentsS: BatimentsService) { }

  async createPartie(idJoueur) {
    const joueur = new Joueur(localStorage.getItem('nomUser'));
    const carte = this.cartesS.initCarte();
    const batiments = this.batimentsS.getRandomBatiments();

    return await this.db.list('/parties').push(new Partie(idJoueur, carte, batiments, joueur));
  }

  getPartie(idPartie: string): Observable<Partie> {
    return this.db.object('/parties/' + idPartie).valueChanges().pipe(
      switchMap((partie: Partie) => {
        // Transforme l'objet de string partie.evenements en tableau de string
        const keys = Object.keys(partie.evenements);
        const evenements = [];
        keys.forEach((key) => {
          evenements.push(partie.evenements[key]);
        });
        partie.evenements = evenements;
        return of(partie);
      })
    );
  }

  addEvenements(idPartie: string, messageEvenement: string) {
    this.db.list('/parties/' + idPartie + '/evenements').push(messageEvenement);
  }

  addJoueur(idPartie: string, idJoueur: string, joueur: Joueur, messageEvenement: string): void {
    this.updateJoueur(idPartie, idJoueur, joueur);
    this.addEvenements(idPartie, messageEvenement);
  }

  updateJoueur(idPartie: string, idJoueur: string, donnees: object) {
    this.db.object('/parties/' + idPartie + '/joueurs/' + idJoueur).update(donnees);
  }

  commencerPartie(idPartie: string, idJoueurs: string[], parametres: {nbMaxOuvriers, nbMaxBatiments}, messageEvenement: string) {
    this.db.object('/parties/' + idPartie).update({
      dateDebut: Date.now(),
      manche: 1
    });
    this.db.object('/parties/' + idPartie + '/batiments').update({
      nbMaxBatiments: parametres.nbMaxBatiments
    });
    // Pas moyen d'actualiser tous les joueurs d'un coup avec Firebase, donc on fait une requête par
    // joueur à actualiser...
    idJoueurs.forEach(idJoueur => {
      this.updateJoueur(idPartie, idJoueur, {
        pieces: 3,
        ouvriers: parametres.nbMaxOuvriers
      });
    });

    this.addEvenements(idPartie, messageEvenement);
  }



}
