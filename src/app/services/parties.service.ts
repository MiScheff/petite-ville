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
import { JoueursService } from './joueurs.service';

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

  private infosPartieSrc = new BehaviorSubject(null);
  infosPartie$ = this.infosPartieSrc.asObservable();

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

// REFACTO-supp
  initPartie(idPartie: string): void {
    this.db.object('/parties/' + idPartie).valueChanges().subscribe((partie: Partie) => {
      this.partie = partie;
      this.carteSrc.next(partie.carte);
      this.batimentsSrc.next(partie.batiments);
      this.evenementsSrc.next(partie.evenements);
      this.infosPartieSrc.next(partie.infosPartie);
    });
  }

  getInfosPartie(): Observable<InfosPartie> {
    return this.db.object('/parties/' + this.idPartie + '/infosPartie').valueChanges() as Observable<InfosPartie>;
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

  commencerPartie(idJoueurs: string[], parametres: {nbMaxOuvriers, nbMaxBatiments}, messageEvenement: string) {
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

  // TODO: A déplacer dans batiment.service
  placementBatiment(idPartie: string, carte: Case[][], idJoueur: string, joueur: Joueur) {
    this.cartesS.updateCarte(carte);
    this.joueursS.updateJoueur(idJoueur, joueur);
    this.joueursS.updateJoueurActif({ aJoue: true });
    // this.updat
  }

  updateBatiments(idPartie: string, listeBatiments: Batiment[], nbChampsBle?: number) {
    const batiments = { listeBatiments };
    // tslint:disable-next-line: no-string-literal
    if (nbChampsBle) { batiments['nbChampsBle'] = nbChampsBle; }

    this.db.object('/parties/' + idPartie + '/batiments').update(batiments);

  }




}
