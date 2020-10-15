import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Joueur } from 'src/app/models/joueur';
import { JoueurActif } from 'src/app/models/joueurActif';
import { Utilisateur } from 'src/app/models/utilisateur';
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

  joueurs: Joueur[];
  joueurActif: JoueurActif;

  joueurs$: Subscription;
  joueurActif$: Subscription;

  constructor(private partiesS: PartiesService,
              private joueursS: JoueursService,
              private evenementsS: EvenementsService) { }

  ngOnInit(): void {
    this.joueurs$ = this.joueursS.getJoueurs().subscribe(joueurs => {
      this.joueurs = joueurs;
      this.nbJoueurs = Object.keys(joueurs).length;
    });
    this.joueurActif$ = this.joueursS.getJoueurActif().subscribe(joueurActif => this.joueurActif = joueurActif);
  }

  commencer(): void {
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
    const nextJoueur = this.joueursS.getNextJoueurActif(this.joueurs, this.joueurActif.id);
    this.evenementsS.addEvenements(this.joueurActif.nom + ' a fini son tour.');
    this.joueursS.updateJoueurActif(nextJoueur);
  }

  ngOnDestroy(): void {
    this.joueurs$.unsubscribe();
    this.joueurActif$.unsubscribe();
  }

}
