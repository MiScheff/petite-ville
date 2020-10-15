import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/app/models/joueur';
import { JoueurActif } from 'src/app/models/joueurActif';
import { Partie } from 'src/app/models/partie';
import { Utilisateur } from 'src/app/models/utilisateur';
import { EvenementsService } from 'src/app/services/evenements.service';
import { JoueursService } from 'src/app/services/joueurs.service';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-actions-partie',
  templateUrl: './actions-partie.component.html',
  styleUrls: ['./actions-partie.component.sass']
})
export class ActionsPartieComponent implements OnInit {
  nbJoueurs: number;
  @Input() user: Utilisateur;
  @Input() etatPartie: string;
  @Input() monTour: boolean;

  joueurs: Joueur[];
  joueurActif: JoueurActif;

  constructor(private partiesS: PartiesService, private joueursS: JoueursService, private evenementsS: EvenementsService) { }

  ngOnInit(): void {
    this.joueursS.getJoueurs().subscribe(joueurs => {
      this.joueurs = joueurs;
      this.calcNbJoueurs();
    });
    this.joueursS.getJoueurActif().subscribe(joueurActif => this.joueurActif = joueurActif);
  }

  commencer(): void {
    const parametres = this.getParametres();
    const msg = this.user.nom + ' a lancé la partie.';
    this.partiesS.commencerPartie(Object.keys(this.joueurs), parametres, msg);
  }

  getParametres() { // Définit le nombre d'ouvriers et de bâtiments max pour chaque joueur selon le nombre de joueur
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

  finTour() {
    const nextJoueur = this.getNextJoueurActif();
    this.evenementsS.addEvenements(this.joueurActif.nom + ' a fini son tour.');
    this.joueursS.updateJoueurActif(nextJoueur);
  }

  // TODO: A deplacer dans JoueursService, en tant qu'Observable.
  getNextJoueurActif(): JoueurActif {
    const tabJoueurs = Object.keys(this.joueurs);
    const currentIndex = tabJoueurs.indexOf(this.joueurActif.id);

    let nextIndex;
    if (currentIndex === tabJoueurs.length - 1) { nextIndex = 0; }
    else { nextIndex = currentIndex + 1; }

    const nextId = tabJoueurs[nextIndex];

    return {
      id: nextId,
      nom: this.joueurs[nextId].nom,
      aJoue: false,
      batimentChoisi: null
    };
  }

  // TODO: A deplacer dans JoueursService, en tant qu'Observable.
  calcNbJoueurs(): void {
    const listeJoueurs = Object.keys(this.joueurs);
    this.nbJoueurs = listeJoueurs.length;
    console.log(this.nbJoueurs);
  }
}
