import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Joueur } from 'src/app/models/joueur';
import { JoueurActif } from 'src/app/models/joueurActif';
import { JoueursService } from 'src/app/services/joueurs.service';

@Component({
  selector: 'pv-joueurs',
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.sass']
})
export class JoueursComponent implements OnInit, OnDestroy {
  @Input() monTour: boolean;

  joueurs: Joueur[];
  joueurActif: JoueurActif;
  detailsJoueur: Joueur;
  souscriptions$: Subscription;

  constructor(private joueursS: JoueursService) {
  }

  ngOnInit(): void {
    this.souscriptions$ = combineLatest([
      this.joueursS.getJoueurs(),
      this.joueursS.getJoueurActif()]
    ).subscribe(([joueurs, joueurActif]) => {
        this.joueurs = joueurs;
        this.joueurActif = joueurActif;
        this.detailsJoueur = joueurs[joueurActif.id];
      }
    );
  }

  acheterRessource(type: string) {
    this.detailsJoueur.ressources = this.joueursS.updateRessources(this.detailsJoueur.ressources, '-', { piece: 3 });
    this.detailsJoueur.ressources[type]++;
    this.joueursS.updateJoueur(this.joueurActif.id, { ressources: this.detailsJoueur.ressources });
  }

  ngOnDestroy(): void {
    this.souscriptions$.unsubscribe();
  }
}
