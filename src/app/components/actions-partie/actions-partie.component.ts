import { Component, Input, OnInit } from '@angular/core';
import { JoueurActif } from 'src/app/models/joueurActif';
import { Partie } from 'src/app/models/partie';
import { Utilisateur } from 'src/app/models/utilisateur';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-actions-partie',
  templateUrl: './actions-partie.component.html',
  styleUrls: ['./actions-partie.component.sass']
})
export class ActionsPartieComponent implements OnInit {
  @Input() nbJoueurs: number;
  @Input() user: Utilisateur;
  @Input() idPartie: string;
  @Input() partie: Partie;
  @Input() etatPartie: string;
  @Input() infosTour: { monTour, aJoue }; // TODO: A modifier voire supprimer

  constructor(private partiesS: PartiesService) { }

  ngOnInit(): void {
  }

  commencer(): void {
    const parametres = this.getParametres();
    const msg = this.user.nom + ' a lancé la partie.';
    this.partiesS.commencerPartie(this.idPartie, Object.keys(this.partie.joueurs), parametres, msg);
  }

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

  finTour() {
    const nextJoueur = this.getNextJoueurActif();
    this.partiesS.updateJoueurActif(this.idPartie, nextJoueur);
  }

  getNextJoueurActif(): JoueurActif {
    const tabJoueurs = Object.keys(this.partie.joueurs);
    const currentIndex = tabJoueurs.indexOf(this.partie.joueurActif.id);

    let nextIndex;
    if (currentIndex === tabJoueurs.length - 1) { nextIndex = 0; }
    else { nextIndex = currentIndex + 1; }

    const nextId = tabJoueurs[nextIndex];

    return {
      id: nextId,
      nom: this.partie.joueurs[nextId].nom,
      aJoue: false,
      construit: false
    };
  }
}
