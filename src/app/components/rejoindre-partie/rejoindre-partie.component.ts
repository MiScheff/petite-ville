import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/app/models/joueur';
import { Partie } from 'src/app/models/partie';
import { Utilisateur } from 'src/app/models/utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { JoueursService } from 'src/app/services/joueurs.service';
import { PartiesService } from 'src/app/services/parties.service';

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
              private joueursS: JoueursService) { }

  ngOnInit(): void {
    this.joueursS.getJoueurs().subscribe(joueurs => {
      this.joueurs = joueurs;
      this.calcNbJoueurs();
    });
  }

  connexion(): void {
    this.authS.signin();
  }

  rejoindre(): void {
    if (!this.user) { return; }

    const msg = this.user.nom + ' a rejoint la partie.';
    this.joueursS.addJoueur(this.user.id, new Joueur(this.user.nom), msg);
  }

  calcNbJoueurs(): void {
    const listeJoueurs = Object.keys(this.joueurs);
    this.nbJoueurs = listeJoueurs.length;
    console.log(this.nbJoueurs);
  }
}
