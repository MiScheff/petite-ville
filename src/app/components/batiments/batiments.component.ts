import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Batiment } from 'src/app/models/batiment';
import { InfosBatiments } from 'src/app/models/infosBatiments';
import { Joueur } from 'src/app/models/joueur';
import { JoueurActif } from 'src/app/models/joueurActif';
import { BatimentsService } from 'src/app/services/batiments.service';
import { JoueursService } from 'src/app/services/joueurs.service';

@Component({
  selector: 'pv-batiments',
  templateUrl: './batiments.component.html',
  styleUrls: ['./batiments.component.sass']
})
export class BatimentsComponent implements OnInit, OnDestroy {
  @Input() monTour;

  batiments: InfosBatiments;
  joueurs: Joueur[];
  joueurActif: JoueurActif;
  detailsJoueur: Joueur;

  champsBle: Batiment[];

  souscriptions$: Subscription;

  constructor(private batimentsS: BatimentsService,
              private joueursS: JoueursService) { }

  ngOnInit(): void {
    this.champsBle = this.batimentsS.getChampsBle();

    this.souscriptions$ = combineLatest([
      this.batimentsS.getBatiments(),
      this.joueursS.getJoueurs(),
      this.joueursS.getJoueurActif()]
    ).subscribe(([batiments, joueurs, joueurActif]) => {
        this.batiments = batiments;
        this.joueurs = joueurs;
        this.joueurActif = joueurActif;
        this.detailsJoueur = joueurs[joueurActif.id];
      }
    );
  }

  actionBle(index: number): void {
    if (index < 0) { return; }
    this.actionBatiment(this.champsBle[index]);
  }

  actionBatiment(batiment: Batiment): void {
    if (!this.monTour || this.detailsJoueur.batiments >= this.batiments.nbMaxBatiments || !batiment.disponible) { return; }

    if (this.joueursS.ressourcesSuffisantes(this.detailsJoueur, batiment.cout)) {
      this.joueurActif.batimentChoisi = batiment;
      this.joueursS.updateJoueurActif(this.joueurActif);
      console.log(`Batiment ${batiment.nom} choisi. Cliquer où le placer.`);
    }
  }

  annuleChoixBatiment() {
    this.joueurActif.batimentChoisi = null;
    this.joueursS.updateJoueurActif(this.joueurActif);
  }

  ngOnDestroy(): void {
    this.souscriptions$.unsubscribe();
  }

}
