import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Batiment } from '../models/batiment';
import { Joueur } from '../models/joueur';
import { JoueurActif } from '../models/joueurActif';
import { Ressources } from '../models/ressources';
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

  getJoueurs(): Observable<Joueur[]> {
    return this.db.object('/parties/' + this.idPartie + '/joueurs').valueChanges() as Observable<Joueur[]>;
  }

  getJoueurActif(): Observable<JoueurActif> {
    return this.db.object('/parties/' + this.idPartie + '/joueurActif').valueChanges() as Observable<JoueurActif>;
  }

  updateJoueurActif(donnees: Partial<JoueurActif>): void {
    this.db.object('/parties/' + this.idPartie + '/joueurActif').update(donnees);
  }

  updateJoueur(idJoueur: string, donnees: Partial<Joueur>): void {
    this.db.object('/parties/' + this.idPartie + '/joueurs/' + idJoueur).update(donnees);
  }

  buyBatiment(idJoueur: string, joueur: Joueur, cout: Partial<Ressources>): void {
    joueur.batiments++;
    joueur.ressources = this.updateRessources(joueur.ressources, '-', cout);

    this.updateJoueur(idJoueur, joueur);
  }

  getNextJoueurActif(joueurs: Joueur[], idJoueurActif: string): JoueurActif {

    const tabJoueurs = Object.keys(joueurs);
    const currentIndex = tabJoueurs.indexOf(idJoueurActif);

    let nextIndex;
    if (currentIndex === tabJoueurs.length - 1) { nextIndex = 0; }
    else { nextIndex = currentIndex + 1; }

    const nextId = tabJoueurs[nextIndex];

    return {
      id: nextId,
      nom: joueurs[nextId].nom,
      aJoue: false,
      batimentChoisi: null
    };
  }

  ressourcesSuffisantes(joueur: Joueur, ressources: Partial<Ressources>): boolean {
    const tabRess = Object.keys(ressources);
    let assez = true;

    for (let i = 0; i < tabRess.length && assez; i++) {
      assez = joueur.ressources[tabRess[i]] >= ressources[tabRess[i]] ? true : false;
    }
    return assez;
  }

  updateRessources(ressourcesJoueur: Ressources,  operation: string, ressources: Partial<Ressources>): Ressources {
    const tabRess = Object.keys(ressources);
    for (const type of tabRess) {
      if (operation === '+') { ressourcesJoueur[type] += ressources[type]; }
      else { ressourcesJoueur[type] -= ressources[type]; }
    }
    return ressourcesJoueur;
  }


  actionneBatiment(idJoueur: string, batiment: Batiment, idProprietaire: string, joueurs: Joueur[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const cout = batiment.entree || {};
      const gain = batiment.sortie;

      if (idJoueur !== idProprietaire) {
        cout.piece = 1;
        joueurs[idProprietaire].ressources.piece++;
      }

      if (!this.ressourcesSuffisantes(joueurs[idJoueur], cout)) { resolve(false); return; }

      joueurs[idJoueur].ressources = this.updateRessources(joueurs[idJoueur].ressources, '-', cout);
      joueurs[idJoueur].ressources = this.updateRessources(joueurs[idJoueur].ressources, '+', gain);

      this.updateJoueur(idJoueur, joueurs[idJoueur]);
      this.updateJoueur(idProprietaire, joueurs[idProprietaire]);

      resolve(true);
    });
  }
}
