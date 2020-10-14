import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Batiment } from '../models/batiment';
import { Case } from '../models/case';
import { InfosPartie } from '../models/infosPartie';
import { Joueur } from '../models/joueur';
import { JoueurActif } from '../models/joueurActif';
import { Partie } from '../models/partie';
import { BatimentsService } from './batiments.service';
import { CartesService } from './cartes.service';
import { EvenementsService } from './evenements.service';
import { InitService } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class PartiesService {
  idPartie: string;
  partie: Partie;

  private carteSrc = new BehaviorSubject(null);
  carte$ = this.carteSrc.asObservable();

  private batimentsSrc = new BehaviorSubject(null);
  batiments$ = this.batimentsSrc.asObservable();

  private evenementsSrc = new BehaviorSubject(null);
  evenements$ = this.evenementsSrc.asObservable();

  private joueursSrc = new BehaviorSubject(null);
  joueurs$ = this.joueursSrc.asObservable();

  private infosPartieSrc = new BehaviorSubject(null);
  infosPartie$ = this.infosPartieSrc.asObservable();

  constructor(private db: AngularFireDatabase,
              private cartesS: CartesService,
              private batimentsS: BatimentsService,
              private evenementsS: EvenementsService,
              private initS: InitService) {

    this.initS.idPartie$.subscribe(idPartie => {
      console.log('idPArtir', idPartie);
      
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

// REFACTO-supp
  initPartie(idPartie: string): void {
    this.db.object('/parties/' + idPartie).valueChanges().subscribe((partie: Partie) => {
      console.log('LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', partie, this.idPartie);
      
      this.partie = partie;
      this.carteSrc.next(partie.carte);
      this.batimentsSrc.next(partie.batiments);
      this.evenementsSrc.next(partie.evenements);
      this.joueursSrc.next(partie.joueurs);
      this.infosPartieSrc.next(partie.infosPartie);
    });
  }

  getInfosPartie() {
    this.db.object('/parties/' + this.idPartie + '/infosPartie').valueChanges().subscribe((infosPartie: InfosPartie) => {
      console.log('fonctionne ? ', infosPartie);
      
      this.infosPartieSrc.next(infosPartie);
    });
  }

  toArray(objet) {
    // Transforme l'objet d'objets partie.joueur en tableau d'objets
    const tableau = [];
    const keys = Object.keys(objet);
    keys.forEach((key) => {
      tableau.push(objet[key]);
    });

    return tableau;
  }

  // REFACTO-supp
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

  // TODO: A déplacer dans joueur service
  updateJoueurActif(idPartie, donnees: Partial<JoueurActif>) {
    this.db.object('/parties/' + idPartie + '/joueurActif').update(donnees);
  }

  // TODO: A déplacer dans joueur service
  updateJoueur(idPartie: string, idJoueur: string, donnees: Partial<Joueur>) {
    this.db.object('/parties/' + idPartie + '/joueurs/' + idJoueur).update(donnees);
  }

  commencerPartie(idPartie: string, idJoueurs: string[], parametres: {nbMaxOuvriers, nbMaxBatiments}, messageEvenement: string) {
    this.db.object('/parties/' + idPartie + '/infosPartie').update({
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

    this.evenementsS.addEvenements(messageEvenement);
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
