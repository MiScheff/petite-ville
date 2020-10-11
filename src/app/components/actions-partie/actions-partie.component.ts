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

  constructor(private partiesS: PartiesService) { }

  ngOnInit(): void {
  }

  commencer(): void {
    const msg = this.user.nom + ' a lancé la partie.';
    this.partiesS.commencerPartie(this.idPartie, msg);
  }
}
