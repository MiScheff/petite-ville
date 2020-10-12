import { Component, Input, OnInit } from '@angular/core';
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
}
