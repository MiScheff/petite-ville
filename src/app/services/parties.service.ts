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

  getPartie(idPartie) {
    return this.db.object('/parties/' + idPartie).valueChanges().pipe(
      switchMap((partie: Partie) => {
        // Transforme l'objet d'objets partie.joueur en tableau d'objets
        const keys = Object.keys(partie.joueurs);
        const arrJoueurs = [];
        keys.forEach((key) => {
          arrJoueurs.push(partie.joueurs[key]);
        });
        partie.joueurs = arrJoueurs;
        return of(partie);
      })
    );
  }
}
