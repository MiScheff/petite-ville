import { Component, Input, OnInit } from '@angular/core';
import _ from 'underscore';
import { CartesService } from 'src/app/services/cartes.service';
import { Case } from 'src/app/models/case';
import { PartiesService } from 'src/app/services/parties.service';
import { Partie } from 'src/app/models/partie';
import { JoueursService } from 'src/app/services/joueurs.service';
import { Joueur } from 'src/app/models/joueur';
import { Ressources } from 'src/app/models/ressources';

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
  @Input() joueurActif;

  detailsJoueur: Joueur;

  constructor(private carteS: CartesService,
              private partiesS: PartiesService,
              private joueursS: JoueursService) { }

  ngOnInit(): void {
  }

  actionCase(tuile: Case) {
    if (!this.infosTour.monTour) { return; }

    this.detailsJoueur = this.partie.joueurs[this.joueurActif.id];

    if (!this.joueurActif.aJoue && !this.joueurActif.construit) {
      this.placeOuvrier(tuile);
    } else if (!this.joueurActif.aJoue && this.joueurActif.construit) {
      this.placeBatiment();
    }
  }

  placeOuvrier(tuile: Case) {
    if (tuile.content) { return; }

    this.detailsJoueur.ouvriers--;
    this.getCase(tuile.x, tuile.y).content = { type: 'ouvrier', proprietaire: this.joueurActif.id };
    this.addRessources(this.getRessourcesAdjacentes(tuile.x, tuile.y));

    this.partiesS.placementOuvrier(this.idPartie, this.carte, this.joueurActif.id, this.detailsJoueur);
    this.joueurActif.aJoue = true;
  }

  placeBatiment() {}

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
      const typeTuile = this.getCase(tx, ty).content;

      if (typeTuile === 'pierre' || typeTuile === 'bois' || typeTuile === 'poisson') {
        ressources[typeTuile]++;
      }
    });

    return ressources;
  }

  addRessources(ressources: Partial<Ressources>) {
    this.detailsJoueur.ressources.pierre += ressources.pierre;
    this.detailsJoueur.ressources.bois += ressources.bois;
    this.detailsJoueur.ressources.poisson += ressources.poisson;
  }

  showTuilesLibres(tuile): boolean {
    return this.infosTour.monTour && !this.joueurActif.aJoue && !tuile.content
          && this.partie.dateDebut && !this.partie.dateFin;
  }

  disabledTuile(tuile) {
    return tuile.content || !this.partie.dateDebut || this.partie.dateFin;
  }
}
