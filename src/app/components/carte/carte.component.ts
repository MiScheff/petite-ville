import { Component, Input, OnInit } from '@angular/core';
import _ from 'underscore';
import { CartesService } from 'src/app/services/cartes.service';
import { Case } from 'src/app/models/case';
import { PartiesService } from 'src/app/services/parties.service';
import { Partie } from 'src/app/models/partie';
import { JoueursService } from 'src/app/services/joueurs.service';
import { Joueur } from 'src/app/models/joueur';
import { Ressources } from 'src/app/models/ressources';
import { JoueurActif } from 'src/app/models/joueurActif';
import { Batiment } from 'src/app/models/batiment';
import { InfosPartie } from 'src/app/models/infosPartie';
import { BatimentsService } from 'src/app/services/batiments.service';
import { InfosBatiments } from 'src/app/models/infosBatiments';

@Component({
  selector: 'pv-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.sass']
})
export class CarteComponent implements OnInit {
  @Input() monTour: boolean;

  infosPartie: InfosPartie;
  carte: Case[][];
  batiments: InfosBatiments;
  joueurs: Joueur[];
  joueurActif: JoueurActif;
  detailsJoueur: Joueur;

  constructor(private cartesS: CartesService,
              private partiesS: PartiesService,
              private joueursS: JoueursService,
              private batimentsS: BatimentsService) {

              }

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

  actionCase(tuile: Case) {
    if (!this.monTour) { return; }

    this.detailsJoueur = this.joueurs[this.joueurActif.id]; // ?

    if (!this.joueurActif.aJoue && !this.joueurActif.batimentChoisi) {
      this.placeOuvrier(tuile);
    } else if (!this.joueurActif.aJoue && this.joueurActif.batimentChoisi) {
      this.placeBatiment(tuile, this.joueurActif.batimentChoisi);
    }
  }

  placeOuvrier(tuile: Case) {
    if (tuile.content || this.detailsJoueur.ouvriers < 1) { return; }

    this.detailsJoueur.ouvriers--;
    this.getCase(tuile.x, tuile.y).content = { type: 'ouvrier', proprietaire: this.joueurActif.id };
    this.addRessources(this.getRessourcesAdjacentes(tuile.x, tuile.y));

    this.cartesS.placementOuvrier(this.carte, this.joueurActif.id, this.detailsJoueur);
    this.joueurActif.aJoue = true;
  }

  async placeBatiment(tuile: Case, batiment: Batiment) {
    if (tuile.content || this.detailsJoueur.batiments >= this.batiments.nbMaxBatiments) { return; }
    
    // Place le batiment sur la carte
    this.getCase(tuile.x, tuile.y).content = { type: 'batiment', proprietaire: this.joueurActif.id, batiment};
    
    this.batimentsS.setBatimentIndisponible(this.batiments.listeBatiments, batiment);
    this.joueursS.buyBatiment(this.joueurActif.id, this.detailsJoueur, batiment.cout);
    this.cartesS.placementBatiment(this.carte, this.joueurActif, this.detailsJoueur);
    
    this.joueurActif.batimentChoisi = null;
    this.joueurActif.aJoue = true;
  }

  getCase(x, y) {
    return this.carte[y][x];
  }

  getCasesAdjacentes(x, y): string[] {
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

  getRessourcesAdjacentes(x, y) {
    const ressources = {
      pierre: 0,
      bois: 0,
      poisson: 0
    };
    const casesAjd = this.getCasesAdjacentes(x, y);
    casesAjd.forEach((tuile) => {
      const tx = tuile.split(',')[1];
      const ty = tuile.split(',')[0];
      console.log(this.getCase(tx, ty));

      const typeTuile = this.getCase(tx, ty).content?.type;

      if (typeTuile === 'pierre' || typeTuile === 'bois' || typeTuile === 'poisson') {
        ressources[typeTuile]++;
      }
    });
    console.log('récup ressources :', ressources);

    return ressources;
  }

  addRessources(ressources: Partial<Ressources>) {
    this.detailsJoueur.ressources.pierre += ressources.pierre;
    this.detailsJoueur.ressources.bois += ressources.bois;
    this.detailsJoueur.ressources.poisson += ressources.poisson;
  }

  showTuilesLibres(tuile): boolean {
    return this.monTour && !this.joueurActif?.aJoue
          && !tuile.content
          && this.detailsJoueur?.ouvriers > 0 && this.infosPartie.dateDebut && !this.infosPartie.dateFin;
  }

  disabledTuile(tuile) {
    return tuile.content || !this.infosPartie.dateDebut || this.infosPartie.dateFin;
  }
}
