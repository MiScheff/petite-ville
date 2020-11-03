import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Batiment } from 'src/app/models/batiment';
import { Case } from 'src/app/models/case';
import { InfosBatiments } from 'src/app/models/infosBatiments';
import { InfosPartie } from 'src/app/models/infosPartie';
import { Joueur } from 'src/app/models/joueur';
import { JoueurActif } from 'src/app/models/joueurActif';
import { Ressources } from 'src/app/models/ressources';
import { BatimentsService } from 'src/app/services/batiments.service';
import { CartesService } from 'src/app/services/cartes.service';
import { JoueursService } from 'src/app/services/joueurs.service';
import { PartiesService } from 'src/app/services/parties.service';
import _ from 'underscore';

@Component({
  selector: 'pv-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.sass']
})
export class CarteComponent implements OnInit, OnDestroy {
  @Input() monTour: boolean;

  infosPartie: InfosPartie;
  carte: Case[][];
  batiments: InfosBatiments;
  joueurs: Joueur[];
  joueurActif: JoueurActif;
  detailsJoueur: Joueur;

  batimentsActionnables: string[] = [];

  souscriptions$: Subscription;


  constructor(private cartesS: CartesService,
              private partiesS: PartiesService,
              private joueursS: JoueursService,
              private batimentsS: BatimentsService) { }

  ngOnInit(): void {
    this.souscriptions$ = combineLatest([
      this.partiesS.getInfosPartie(),
      this.cartesS.getCarte(),
      this.batimentsS.getBatiments(),
      this.joueursS.getJoueurs(),
      this.joueursS.getJoueurActif()]
    ).subscribe(([infosPartie, carte, batiments, joueurs, joueurActif]) => {
        this.infosPartie = infosPartie;
        this.carte = carte;
        this.batiments = batiments;
        this.joueurs = joueurs;
        this.joueurActif = joueurActif;
        this.detailsJoueur = joueurs[joueurActif.id];
      }
    );
  }

  actionCase(tuile: Case): void {
    if (!this.monTour) { return; }

    if (!this.joueurActif.aJoue && !this.joueurActif.batimentChoisi) {
      this.placerOuvrier(tuile);
    }
    else if (!this.joueurActif.aJoue && this.joueurActif.batimentChoisi) {
      this.placerBatiment(tuile, this.joueurActif.batimentChoisi);
    }
    else if (this.joueurActif.aJoue && this.isActionnable(tuile)) {
      this.joueursS.actionneBatiment(this.joueurActif.id, tuile.content.batiment, tuile.content.proprietaire)
      .then(res => {
        if (res) {
          this.batimentsActionnables = _.without(this.batimentsActionnables, `${tuile.y},${tuile.x}`);
        } else {
          console.log('Vous n\'avez pas assez de ressources.');
        }
      });
    }
  }

  placerOuvrier(tuile: Case): void {
    if (tuile.content || this.detailsJoueur.ouvriers < 1) { return; }

    this.detailsJoueur.ouvriers--;
    // Place l'ouvrier sur la carte
    this.getCase(tuile.x, tuile.y).content = {
      type: 'ouvrier',
      proprietaire: this.joueurActif.id,
      indexJ: 'J' + this.joueursS.getIndexJoueur(this.joueurActif.id)
    };

    // Ajoute les ressources récupérées aux alentours à detailsJours.ressources
    this.detailsJoueur.ressources = this.joueursS.updateRessources(
      this.detailsJoueur.ressources, '+', this.getRessourcesAdjacentes(tuile.x, tuile.y)
    );
    // Sauvegarde les données en BDD
    this.cartesS.placementOuvrier(this.joueurActif.id, this.detailsJoueur);
    this.joueurActif.aJoue = true;

    this.activeBatimentsAdjacents(tuile);
  }

  placerBatiment(tuile: Case, batiment: Batiment): void {
    if (tuile.content || this.detailsJoueur.batiments >= this.batiments.nbMaxBatiments) { return; }

    this.detailsJoueur.ouvriers--;
    // Place le batiment sur la carte
    this.getCase(tuile.x, tuile.y).content = {
      type: 'batiment',
      proprietaire: this.joueurActif.id,
      batiment,
      indexJ: 'J' + this.joueursS.getIndexJoueur(this.joueurActif.id)
    };

    this.detailsJoueur.ressources.score += batiment.score;

    // Si champ de blé, on décrémente nbChampBle, sinon on rend le bâtiment indisponible à l'achat
    if (batiment.nom === 'Champ de blé') { this.batimentsS.updateBatiments({ nbChampsBle: this.batiments.nbChampsBle - 1 }); }
    else { this.batimentsS.setBatimentIndisponible(this.batiments.listeBatiments, batiment); }

    this.joueursS.buyBatiment(this.joueurActif.id, this.detailsJoueur, batiment.cout);
    this.cartesS.placementBatiment(this.joueurActif, this.detailsJoueur);

    this.joueurActif.aJoue = true;
  }

  activeBatimentsAdjacents(tuile: Case) {
    this.batimentsActionnables = [];
    const casesAdj = this.getCasesAdjacentes(tuile.x, tuile.y);
    for (const c of casesAdj) {
      const tx = +c.split(',')[1];
      const ty = +c.split(',')[0];
      const t = this.getCase(tx, ty);

      if (t.content?.type === 'batiment' && t.content?.batiment.activable) {
        console.log(`${tx},${ty} : ${this.carte[ty][tx].content.batiment.nom}`);
        this.batimentsActionnables.push(`${ty},${tx}`);
      }
    }
  }

  getCase(x: number, y: number): Case {
    return this.carte[y][x];
  }

  getCasesAdjacentes(x: number, y: number): string[] {
    const casesAdjacentes = [];
    for (let j = y - 1; j <= y + 1; j++) {
      if (j >= 0 && j < 6) {
        for (let i = x - 1; i <= x + 1; i++) {
          if (i >= 0 && i < 9) {
            casesAdjacentes.push(j + ',' + i);
          }
        }
      }
    }
    return _.without(casesAdjacentes, `${y},${x}`);
  }

  getRessourcesAdjacentes(x: number, y: number): Partial<Ressources> {
    const ressources = {
      pierre: 0,
      bois: 0,
      poisson: 0
    };
    const casesAdj = this.getCasesAdjacentes(x, y);
    casesAdj.forEach((tuile) => {
      const tx = +tuile.split(',')[1];
      const ty = +tuile.split(',')[0];

      const typeTuile = this.getCase(tx, ty).content?.type;

      if (typeTuile === 'pierre' || typeTuile === 'bois' || typeTuile === 'poisson') {
        ressources[typeTuile]++;
      }
    });

    return ressources;
  }


  showTuilesLibres(tuile: Case): boolean {
    return this.monTour && !this.joueurActif.aJoue
          && !tuile.content
          && this.detailsJoueur.ouvriers > 0
          && this.infosPartie.dateDebut && !this.infosPartie.dateFin && !this.infosPartie.finManche;
  }

  isActionnable(tuile: Case) {
    return _.contains(this.batimentsActionnables, `${tuile.y},${tuile.x}`) && this.monTour;
  }

  disabledTuile(tuile: Case): boolean {
    return (tuile.content || !this.infosPartie.dateDebut || this.infosPartie.dateFin || this.infosPartie.finManche)
          && !this.isActionnable(tuile);
  }

  ngOnDestroy(): void {
    this.souscriptions$.unsubscribe();
  }
}
