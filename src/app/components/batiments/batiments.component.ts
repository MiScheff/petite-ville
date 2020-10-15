import { Component, Input, OnInit } from '@angular/core';
import { Batiment } from 'src/app/models/batiment';
import { Partie } from 'src/app/models/partie';
import { Joueur } from 'src/app/models/joueur';
import { BatimentsService } from 'src/app/services/batiments.service';
import { JoueurActif } from 'src/app/models/joueurActif';
import { PartiesService } from 'src/app/services/parties.service';
import { JoueursService } from 'src/app/services/joueurs.service';
import { InfosBatiments } from 'src/app/models/infosBatiments';

@Component({
  selector: 'pv-batiments',
  templateUrl: './batiments.component.html',
  styleUrls: ['./batiments.component.sass']
})
export class BatimentsComponent implements OnInit {
  @Input() monTour;

  batiments: InfosBatiments;
  joueurs: Joueur[];
  joueurActif: JoueurActif;
  detailsJoueur: Joueur;
  
  champsBle: Batiment[];

  constructor(private batimentsS: BatimentsService,
              private joueursS: JoueursService) { }

  ngOnInit(): void {
    this.champsBle = this.batimentsS.getChampsBle();
    this.batimentsS.getBatiments().subscribe(batiments => this.batiments = batiments);
    this.joueursS.getJoueurs().subscribe(joueurs => this.joueurs = joueurs);
    this.joueursS.getJoueurActif().subscribe(joueurActif => {
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

  ressourcesSuffisantes(cout: { type, quantite }[] ) {
    let assez = true;

    for (let i = 0; i < cout.length && assez; i++) {
      assez = this.joueurs[this.joueurActif.id].ressources[cout[i].type] >= cout[i].quantite;
    }

    return assez;
  }




}
