import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Batiment } from '../models/batiment';
import { Case } from '../models/case';
import { Joueur } from '../models/joueur';
import { JoueurActif } from '../models/joueurActif';
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

  // TODO: A déplacer dans joueur service
  updateJoueurActif(idPartie, donnees: Partial<JoueurActif>) {
    this.db.object('/parties/' + idPartie + '/joueurActif').update(donnees);
  }

  // TODO: A déplacer dans joueur service
  updateJoueur(idPartie: string, idJoueur: string, donnees: Partial<Joueur>) {
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
        ouvriers: parametres.nbMaxOuvriers
      });
    });

    this.addEvenements(idPartie, messageEvenement);
  }

  // TODO: Voir par la suite si on peut update qu'une seule case
  updateCarte(idPartie: string, carte: Case[][]) {
    this.db.object('/parties/' + idPartie + '/carte').update(carte);
  }

  // TODO: A déplacer dans carte.service
  placementOuvrier(idPartie: string, carte: Case[][], idJoueur: string, joueur: Joueur) {
    this.updateCarte(idPartie, carte);
    this.updateJoueur(idPartie, idJoueur, joueur);
    this.updateJoueurActif(idPartie, { aJoue: true });
  }

  // TODO: A déplacer dans batiment.service
  placementBatiment(idPartie: string, carte: Case[][], idJoueur: string, joueur: Joueur) {
    this.updateCarte(idPartie, carte);
    this.updateJoueur(idPartie, idJoueur, joueur);
    this.updateJoueurActif(idPartie, { aJoue: true });
    // this.updat
  }

  updateBatiments(idPartie: string, listeBatiments: Batiment[], nbChampsBle?: number) {
    const batiments = { listeBatiments };
    // tslint:disable-next-line: no-string-literal
    if (nbChampsBle) { batiments['nbChampsBle'] = nbChampsBle; }

    this.db.object('/parties/' + idPartie + '/batiments').update(batiments);

  }




}
