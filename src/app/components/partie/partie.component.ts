import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Partie } from 'src/app/models/partie';
import { Utilisateur } from 'src/app/models/utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.sass']
})
export class PartieComponent implements OnInit, OnDestroy {
  idPartie: string;
  user: Utilisateur;
  partie: Partie;

  partie$: Subscription;
  user$: Subscription;

  infosTour = {
    monTour: false,
    aJoue: false
  };

  constructor(private route: ActivatedRoute,
              private partiesS: PartiesService,
              private authS: AuthService) {
    this.idPartie = this.route.snapshot.paramMap.get('id');
    this.user$ = this.authS.user.subscribe((user: Utilisateur) => this.user = user);
  }

  ngOnInit(): void {
    this.partie$ = this.partiesS.getPartie(this.idPartie).subscribe((partie) => {
      this.partie = partie;
      this.infosTour.monTour = this.user.id === this.partie.joueurActif.id ? true : false;
    });
  }

  participe(): boolean {
    if (!this.user) { return false; }

    const listeJoueurs = Object.keys(this.partie.joueurs);
    return listeJoueurs.indexOf(this.user.id) !== -1 ? true : false;
  }

  nbJoueurs(): number {
    const listeJoueurs = Object.keys(this.partie.joueurs);
    return listeJoueurs.length;
  }

  etatPartie(): string {
    if (this.partie.dateFin) { return 'Finie'; }
    else if (this.partie.dateDebut) { return 'En cours'; }
    else { return 'Non commencée'; }
  }

  ngOnDestroy() {
    this.partie$.unsubscribe();
    this.user$.unsubscribe();
  }


}
