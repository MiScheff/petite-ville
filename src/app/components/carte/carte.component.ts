import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  infosPartie$: Subscription;
  carte$: Subscription;
  batiments$: Subscription;
  joueurs$: Subscription;
  joueurActif$: Subscription;


  constructor(private cartesS: CartesService,
              private partiesS: PartiesService,
              private joueursS: JoueursService,
              private batimentsS: BatimentsService) { }

  ngOnInit(): void {
    this.partiesS.getInfosPartie().subscribe(infosPartie => this.infosPartie = infosPartie);
    this.cartesS.getCarte().subscribe(carte => this.carte = carte);
    this.batimentsS.getBatiments().subscribe(batiments => this.batiments = batiments);
    this.joueursS.getJoueurs().subscribe(joueurs => this.joueurs = joueurs);
    this.joueursS.getJoueurActif().subscribe(joueurActif => {
      this.joueurActif = joueurActif;
      this.detailsJoueur = this.joueurs[this.joueurActif.id];
    });
  }

  actionCase(tuile: Case): void {
    if (!this.monTour) { return; }

    if (!this.joueurActif.aJoue && !this.joueurActif.batimentChoisi) {
      this.placeOuvrier(tuile);
    } else if (!this.joueurActif.aJoue && this.joueurActif.batimentChoisi) {
      this.placeBatiment(tuile, this.joueurActif.batimentChoisi);
    }
  }

  placeOuvrier(tuile: Case): void {
    if (tuile.content || this.detailsJoueur.ouvriers < 1) { return; }

    this.detailsJoueur.ouvriers--;
    // Place l'ouvrier sur la carte
    this.getCase(tuile.x, tuile.y).content = { type: 'ouvrier', proprietaire: this.joueurActif.id };
    // Ajoute les ressources récupérées aux alentours à detailsJours.ressources
    this.addRessources(this.getRessourcesAdjacentes(tuile.x, tuile.y));
    // Sauvegarde les données en BDD
    this.cartesS.placementOuvrier(this.carte, this.joueurActif.id, this.detailsJoueur);
    this.joueurActif.aJoue = true;
  }

  placeBatiment(tuile: Case, batiment: Batiment): void {
    if (tuile.content || this.detailsJoueur.batiments >= this.batiments.nbMaxBatiments) { return; }

    // Place le batiment sur la carte
    this.getCase(tuile.x, tuile.y).content = { type: 'batiment', proprietaire: this.joueurActif.id, batiment};

    this.batimentsS.setBatimentIndisponible(this.batiments.listeBatiments, batiment);
    this.joueursS.buyBatiment(this.joueurActif.id, this.detailsJoueur, batiment.cout);
    this.cartesS.placementBatiment(this.carte, this.joueurActif, this.detailsJoueur);

    this.joueurActif.batimentChoisi = null;
    this.joueurActif.aJoue = true;
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

  addRessources(ressources: Partial<Ressources>): void {
    this.detailsJoueur.ressources.pierre += ressources.pierre;
    this.detailsJoueur.ressources.bois += ressources.bois;
    this.detailsJoueur.ressources.poisson += ressources.poisson;
  }

  showTuilesLibres(tuile: Case): boolean {
    return this.monTour && !this.joueurActif?.aJoue
          && !tuile.content
          && this.detailsJoueur?.ouvriers > 0 && this.infosPartie.dateDebut && !this.infosPartie.dateFin;
  }

  disabledTuile(tuile: Case): boolean {
    return tuile.content || !this.infosPartie.dateDebut || this.infosPartie.dateFin;
  }

  ngOnDestroy(): void {
    this.infosPartie$.unsubscribe();
    this.carte$.unsubscribe();
    this.batiments$.unsubscribe();
    this.joueurs$.unsubscribe();
    this.joueurActif$.unsubscribe();
  }
}
