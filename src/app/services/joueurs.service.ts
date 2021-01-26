import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';

import { Batiment } from '../models/batiment';
import { Joueur } from '../models/joueur';
import { JoueurActif } from '../models/joueurActif';
import { Ressources } from '../models/ressources';
import { InitService } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class JoueursService {
  idPartie: string;
  private joueurs$: BehaviorSubject<Joueur[]> = new BehaviorSubject([]);
  private joueurActif$: BehaviorSubject<JoueurActif> = new BehaviorSubject({
    id: '', nom: '', aJoue: false, batimentChoisi: null, ouvriersANourrir: 0
  });

  constructor(private db: AngularFireDatabase,
              private init: InitService) {
    this.init.idPartie$.subscribe(idPartie => {
      this.idPartie = idPartie;
      this.initDonneesJoueurs();
    });
  }

  addJoueur(idJoueur: string, joueur: Joueur): void {
    this.updateJoueur(idJoueur, joueur);
  }

  initDonneesJoueurs() {
    this.db.object('/parties/' + this.idPartie + '/joueurs').valueChanges()
      .subscribe((joueurs: Joueur[]) => { this.joueurs$.next(joueurs); });

    this.db.object('/parties/' + this.idPartie + '/joueurActif').valueChanges()
      .subscribe((joueurActif: JoueurActif) => { this.joueurActif$.next(joueurActif); });
  }

  getJoueurs(): Observable<Joueur[]> {
    return this.joueurs$.asObservable();
  }

  getJoueurActif(): Observable<JoueurActif> {
    return this.joueurActif$.asObservable();
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

  getNextJoueurActif(idJoueurActif: string, ouvriersANourrir: number): JoueurActif {
    const joueurs = this.joueurs$.getValue();
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
      batimentChoisi: null,
      ouvriersANourrir
    };
  }

  getIndexJoueur(idJoueur: string) {
    const joueurs = this.joueurs$.getValue();
    return Object.keys(joueurs).indexOf(idJoueur);
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

  actionneBatiment(idJoueur: string, batiment: Batiment, idProprietaire: string): Promise<boolean> {
    const joueurs = this.joueurs$.getValue();
    return new Promise((resolve) => {
      const cout = batiment.entree || {};
      if (!cout.piece) { cout.piece = 0; }
      const gain = batiment.sortie;

      if (idJoueur !== idProprietaire) { cout.piece += 1; }

      if (!this.ressourcesSuffisantes(joueurs[idJoueur], cout)) { resolve(false); return; }

      if (idJoueur !== idProprietaire) { joueurs[idProprietaire].ressources.piece++; }
      joueurs[idJoueur].ressources = this.updateRessources(joueurs[idJoueur].ressources, '-', cout);
      joueurs[idJoueur].ressources = this.updateRessources(joueurs[idJoueur].ressources, '+', gain);

      this.updateJoueur(idJoueur, joueurs[idJoueur]);
      this.updateJoueur(idProprietaire, joueurs[idProprietaire]);

      resolve(true);
    });
  }

  calculVainqueur(): Joueur {
    const joueurs = this.joueurs$.getValue();
    const tabIdJoueurs = Object.keys(joueurs);
    let gagnant: Joueur = joueurs[tabIdJoueurs[0]];

    tabIdJoueurs.forEach(idJoueur => {
      if (joueurs[idJoueur].ressources.score > gagnant.ressources.score){
        gagnant = joueurs[idJoueur];
      }
    });

    return gagnant;
  }
}
