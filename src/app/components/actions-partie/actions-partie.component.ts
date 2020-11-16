import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Case } from 'src/app/models/case';
import { InfosPartie } from 'src/app/models/infosPartie';
import { Joueur } from 'src/app/models/joueur';
import { JoueurActif } from 'src/app/models/joueurActif';
import { Utilisateur } from 'src/app/models/utilisateur';
import { CartesService } from 'src/app/services/cartes.service';
import { EvenementsService } from 'src/app/services/evenements.service';
import { JoueursService } from 'src/app/services/joueurs.service';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-actions-partie',
  templateUrl: './actions-partie.component.html',
  styleUrls: ['./actions-partie.component.sass']
})
export class ActionsPartieComponent implements OnInit, OnDestroy {
  nbJoueurs: number;
  @Input() user: Utilisateur;
  @Input() etatPartie: string;
  @Input() monTour: boolean;

  carte: Case[][];
  joueurs: Joueur[];
  joueurActif: JoueurActif;
  detailsJoueur: Joueur;
  infosPartie: InfosPartie;

  gagnant: Joueur;

  souscriptions$: Subscription;

  constructor(private partiesS: PartiesService,
              private joueursS: JoueursService,
              private cartesS: CartesService,
              private evenementsS: EvenementsService) { }

  ngOnInit(): void {
    this.souscriptions$ = combineLatest([
      this.cartesS.getCarte(),
      this.joueursS.getJoueurs(),
      this.joueursS.getJoueurActif(),
      this.partiesS.getInfosPartie()]
    ).subscribe(([carte, joueurs, joueurActif, infosPartie]) => {
        this.carte = carte;
        this.joueurs = joueurs;
        this.nbJoueurs = Object.keys(joueurs).length;
        this.joueurActif = joueurActif;
        this.detailsJoueur = joueurs[joueurActif.id];
        this.infosPartie = infosPartie;

        if (infosPartie.dateFin) {
          this.gagnant = this.joueursS.calculVainqueur();
        }
      }
    );
  }

  commencerPartie(): void {
    const parametres = this.getParametres();
    const msg = this.user.nom + ' a lancé la partie.';
    this.partiesS.commencerPartie(Object.keys(this.joueurs), parametres, msg);
  }

  // Définit le nombre d'ouvriers et de bâtiments max pour chaque joueur selon le nombre de joueur
  getParametres() {
    if (this.nbJoueurs > 4) {
      console.error('Erreur : nbJoueur = ', this.nbJoueurs);
      return;
    }
    const parametres = { nbMaxOuvriers: 3, nbMaxBatiments: 6 };
    if (this.nbJoueurs === 2) {
      parametres.nbMaxOuvriers = 5;
      parametres.nbMaxBatiments = 7;
    } else if (this.nbJoueurs === 3) {
      parametres.nbMaxOuvriers = 4;
    }
    return parametres;
  }

  finTour(): void {
    this.evenementsS.addEvenements(this.joueurActif.nom + ' a fini son tour.');
    this.joueurSuivant();
  }

  nourrirOuvrier(type: string): void {
    if (type === 'poisson' || type === 'ble') {
      this.detailsJoueur.ressources[type]--;
    } else {
      this.detailsJoueur.ressources[type] -= 3;
    }
    this.joueurActif.ouvriersANourrir--;
    this.joueursS.updateJoueur(this.joueurActif.id, this.detailsJoueur);
    this.joueursS.updateJoueurActif({ ouvriersANourrir: this.joueurActif.ouvriersANourrir});
  }

  finManche(): void {
    this.partiesS.updateInfosPartie({ finManche: true });
    this.joueursS.updateJoueur(this.joueurActif.id, { ouvriers: this.infosPartie.nbMaxOuvriers });
    this.joueurSuivant();
  }

  commencerManche(): void {
    // Manche ++, fin manche = false, nextJoueur(), vider les ouvriers de la carte
    this.partiesS.updateInfosPartie({
      manche: this.infosPartie.manche + 1,
      finManche: false
    });
    this.cartesS.videOuvriers();
    this.joueurSuivant();
  }

  joueurSuivant(): void {
    const nextJoueur = this.joueursS.getNextJoueurActif(this.joueurActif.id, this.infosPartie.nbMaxOuvriers);
    this.joueursS.updateJoueurActif(nextJoueur);
  }

  finPartie(): void {
    // alert('Le vainqueur est ' + this.gagnant.nom + ' avec ' + this.gagnant.ressources.score + ' points.');
    this.partiesS.updateInfosPartie({ dateFin: new Date() });
  }

  ngOnDestroy(): void {
    this.souscriptions$.unsubscribe();
  }

}
