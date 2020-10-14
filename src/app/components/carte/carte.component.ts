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

@Component({
  selector: 'pv-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.sass']
})
export class CarteComponent implements OnInit {
  @Input() idPartie: string;
  @Input() partie: Partie;
  @Input() carte: Case[][];
  @Input() infosTour: { monTour, aJoue };
  @Input() joueurActif: JoueurActif;

  detailsJoueur: Joueur;

  constructor(private carteS: CartesService,
              private partiesS: PartiesService,
              private joueursS: JoueursService) { }

  ngOnInit(): void {
    this.detailsJoueur = this.partie.joueurs[this.joueurActif.id];
  }

  actionCase(tuile: Case) {
    if (!this.infosTour.monTour) { return; }

    this.detailsJoueur = this.partie.joueurs[this.joueurActif.id];

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

    this.partiesS.placementOuvrier(this.idPartie, this.carte, this.joueurActif.id, this.detailsJoueur);
    this.joueurActif.aJoue = true;
  }

  placeBatiment(tuile: Case, batiment: Batiment) {
    if (tuile.content || this.detailsJoueur.batiments >= this.partie.batiments.nbMaxBatiments) { return; }

    this.buyBatiment(batiment.cout);
    this.detailsJoueur.batiments++;
    batiment.disponible = false;
    this.getCase(tuile.x, tuile.y).content = { type: 'batiment', proprietaire: this.joueurActif.id, batiment};

    this.partiesS.placementBatiment(this.idPartie, this.carte, this.joueurActif.id, this.detailsJoueur);
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

  buyBatiment(cout: { type, quantite }[]) {
    for (const ressource of cout) {
      this.detailsJoueur.ressources[ressource.type] = this.detailsJoueur.ressources[ressource.type] - ressource.quantite;
    }
  }

  showTuilesLibres(tuile): boolean {
    return this.infosTour.monTour && !this.joueurActif.aJoue
          && !tuile.content
          && this.detailsJoueur.ouvriers > 0 && this.partie.infosPartie.dateDebut && !this.partie.infosPartie.dateFin;
  }

  disabledTuile(tuile) {
    return tuile.content || !this.partie.infosPartie.dateDebut || this.partie.infosPartie.dateFin;
  }
}
