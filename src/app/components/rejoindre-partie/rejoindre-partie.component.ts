import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/app/models/joueur';
import { Utilisateur } from 'src/app/models/utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { EvenementsService } from 'src/app/services/evenements.service';
import { JoueursService } from 'src/app/services/joueurs.service';

@Component({
  selector: 'pv-rejoindre-partie',
  templateUrl: './rejoindre-partie.component.html',
  styleUrls: ['./rejoindre-partie.component.sass']
})
export class RejoindrePartieComponent implements OnInit {
  nbJoueurs: number;
  @Input() user: Utilisateur;
  @Input() etatPartie: string;

  joueurs: Joueur[];

  constructor(private authS: AuthService,
              private joueursS: JoueursService,
              private evenementsS: EvenementsService) { }

  ngOnInit(): void {
    this.joueursS.getJoueurs().subscribe(joueurs => {
      this.joueurs = joueurs;
      this.nbJoueurs = Object.keys(joueurs).length;
    });
  }

  connexion(): void {
    this.authS.signin();
  }

  rejoindre(): void {
    if (!this.user) { return; }

    this.joueursS.addJoueur(this.user.id, new Joueur(this.user.nom));
    this.evenementsS.addEvenement(this.user.nom + ' a rejoint la partie.');
  }

}
