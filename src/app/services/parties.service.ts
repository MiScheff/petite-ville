import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Joueur } from '../models/joueur';
import { Partie } from '../models/partie';

@Injectable({
  providedIn: 'root'
})
export class PartiesService {
  constructor(private db: AngularFireDatabase) { }

  async createPartie(idJoueur) {
    return await this.db.list('/parties').push(new Partie(new Joueur('Mich'), idJoueur));
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
