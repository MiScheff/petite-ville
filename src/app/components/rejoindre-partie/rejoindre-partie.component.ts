import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/app/models/joueur';
import { Partie } from 'src/app/models/partie';
import { Utilisateur } from 'src/app/models/utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-rejoindre-partie',
  templateUrl: './rejoindre-partie.component.html',
  styleUrls: ['./rejoindre-partie.component.sass']
})
export class RejoindrePartieComponent implements OnInit {
  @Input() nbJoueurs: number;
  @Input() user: Utilisateur;
  @Input() idPartie: string;
  @Input() partie: Partie;

  constructor(private partiesS: PartiesService,
              private authS: AuthService) { }

  ngOnInit(): void {
  }

  connexion(): void {
    this.authS.signin();
  }

  rejoindre(): void {
    if (!this.user) { return; }

    const msg = this.user.nom + ' a rejoint la partie.';
    this.partiesS.addJoueur(this.idPartie, this.user.id, new Joueur(this.user.nom), msg);
  }

  etatPartie(): string {
    if (this.partie.dateFin) { return 'Finie'; }
    else if (this.partie.dateDebut) { return 'En cours'; }
    else { return 'Initial'; }
  }
}
