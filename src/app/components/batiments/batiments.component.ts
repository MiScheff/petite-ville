import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  batiments$: Subscription;
  joueurs$: Subscription;
  joueurActif$: Subscription;

  constructor(private batimentsS: BatimentsService,
              private joueursS: JoueursService) { }

  ngOnInit(): void {
    this.champsBle = this.batimentsS.getChampsBle();
    this.batiments$ = this.batimentsS.getBatiments().subscribe(batiments => this.batiments = batiments);
    this.joueurs$ = this.joueursS.getJoueurs().subscribe(joueurs => this.joueurs = joueurs);
    this.joueurActif$ = this.joueursS.getJoueurActif().subscribe(joueurActif => {
      this.joueurActif = joueurActif;
      this.detailsJoueur = this.joueurs[joueurActif.id];
    });
  }

  actionBle(index: number): void {
    if (index < 0) { return; }
    this.actionBatiment(this.champsBle[index]);
  }

  actionBatiment(batiment: Batiment): void {
    if (!this.monTour || this.detailsJoueur.batiments >= this.batiments.nbMaxBatiments || !batiment.disponible) { return; }

    if (this.ressourcesSuffisantes(batiment.cout)) {
      this.joueurActif.batimentChoisi = batiment;
      this.joueursS.updateJoueurActif(this.joueurActif);
      console.log(`Batiment ${batiment.nom} choisi. Cliquer où le placer.`);
    }
  }

  ressourcesSuffisantes(cout: { type, quantite }[] ): boolean {
    let assez = true;
    for (let i = 0; i < cout.length && assez; i++) {
      assez = this.joueurs[this.joueurActif.id].ressources[cout[i].type] >= cout[i].quantite;
    }
    return assez;
  }

  ngOnDestroy(): void {
    this.batiments$.unsubscribe();
    this.joueurs$.unsubscribe();
    this.joueurActif$.unsubscribe();
  }

}
