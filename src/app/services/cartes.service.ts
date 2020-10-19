import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Case } from '../models/case';
import { Joueur } from '../models/joueur';
import { JoueurActif } from '../models/joueurActif';
import { EvenementsService } from './evenements.service';
import { InitService } from './init.service';
import { JoueursService } from './joueurs.service';

@Injectable({
  providedIn: 'root'
})
export class CartesService {
  idPartie: string;

  private carte = []; // La carte fait 6 cases de haut (y) et 9 cases de large (x)

  constructor(private db: AngularFireDatabase,
              private init: InitService,
              private joueursS: JoueursService,
              private evenementsS: EvenementsService) {
    this.init.idPartie$.subscribe(idPartie => {
      this.idPartie = idPartie;
    });
  }

  initCarte() {
    // TODO: stocker ces tableaux en BDD
    // tous les tableaux sont de type array[y][x];
    const casesPierre = ['0,0', '0,3', '0,7', '0,8'];
    const casesBois = ['0,2', '3,0', '4,6', '5,1', '5,2', '5,8'];
    const casesPoisson = ['0,5', '2,0', '3,8', '5,4', '5,5'];

    for (let y = 0; y < 6; y++) {
      this.carte[y] = [];
      for (let x = 0; x < 9; x++) {
        const currentCase = { x, y, content: null };
        if (casesPierre.indexOf(y + ',' + x) !== -1) {
          currentCase.content = { type: 'pierre'};
        } else if (casesBois.indexOf(y + ',' + x) !== -1) {
          currentCase.content = { type: 'bois'};
        } else if (casesPoisson.indexOf(y + ',' + x) !== -1) {
          currentCase.content = { type: 'poisson'};
        }

        this.carte[y][x] = currentCase;
      }
    }

    return this.carte;
  }

  getCarte(): Observable<Case[][]> {
    return this.db.object('/parties/' + this.idPartie + '/carte').valueChanges() as Observable<Case[][]>;
  }

  placementOuvrier(carte: Case[][], idJoueur: string, joueur: Joueur): void {
    this.updateCarte(carte);
    this.joueursS.updateJoueur(idJoueur, joueur);
    this.joueursS.updateJoueurActif({ aJoue: true });
  }

  placementBatiment(carte: Case[][], joueurActif: JoueurActif, joueur: Joueur): void {
    this.updateCarte(carte);
    this.joueursS.updateJoueur(joueurActif.id, joueur);
    this.joueursS.updateJoueurActif({ aJoue: true });
  }

  // TODO: Voir par la suite si on peut update qu'une seule case
  updateCarte(carte: Case[][]): void {
    this.db.object('/parties/' + this.idPartie + '/carte').update(carte);
  }

  videOuvriers(carte: Case[][]) {
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 9; x++) {
        if (carte[y][x].content?.type === 'ouvrier') {
          carte[y][x].content = null;
        }
      }
    }

    this.updateCarte(carte);
  }

}
