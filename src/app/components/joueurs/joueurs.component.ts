import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { InfosPartie } from 'src/app/models/infosPartie';
import { Joueur } from 'src/app/models/joueur';
import { JoueurActif } from 'src/app/models/joueurActif';
import { JoueursService } from 'src/app/services/joueurs.service';
import { PartiesService } from 'src/app/services/parties.service';

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
  infosPartie: InfosPartie;

  souscriptions$: Subscription;

  constructor(private joueursS: JoueursService,
              private partiesS: PartiesService) {
  }

  ngOnInit(): void {
    this.souscriptions$ = combineLatest([
      this.joueursS.getJoueurs(),
      this.joueursS.getJoueurActif(),
      this.partiesS.getInfosPartie()
    ]).subscribe(([joueurs, joueurActif, infosPartie]) => {
      this.joueurs = joueurs;
      this.joueurActif = joueurActif;
      this.detailsJoueur = joueurs[joueurActif.id];
      this.infosPartie = infosPartie;
    });
  }

  acheterRessource(type: string): void {
    this.detailsJoueur.ressources = this.joueursS.updateRessources(this.detailsJoueur.ressources, '-', { piece: 3 });
    this.detailsJoueur.ressources[type]++;
    this.joueursS.updateJoueur(this.joueurActif.id, { ressources: this.detailsJoueur.ressources });
  }

  peutAcheterRessources(idJoueur: string): boolean {
    return this.monTour &&
           idJoueur === this.joueurActif.id &&
           this.detailsJoueur.ressources.piece >= 3 &&
           this.infosPartie.dateDebut != null;
  }

  ngOnDestroy(): void {
    this.souscriptions$.unsubscribe();
  }
}
