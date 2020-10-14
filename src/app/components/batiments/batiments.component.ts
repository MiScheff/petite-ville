import { Component, Input, OnInit } from '@angular/core';
import { Batiment } from 'src/app/models/batiment';
import { Partie } from 'src/app/models/partie';
import { Joueur } from 'src/app/models/joueur';
import { BatimentsService } from 'src/app/services/batiments.service';
import { JoueurActif } from 'src/app/models/joueurActif';
import { PartiesService } from 'src/app/services/parties.service';
import { JoueursService } from 'src/app/services/joueurs.service';

@Component({
  selector: 'pv-batiments',
  templateUrl: './batiments.component.html',
  styleUrls: ['./batiments.component.sass']
})
export class BatimentsComponent implements OnInit {
  @Input() idPartie: string;
  @Input() batiments;
  @Input() joueurActif: JoueurActif;
  @Input() joueurs: Joueur[];
  @Input() monTour;

  champsBle: Batiment[];

  constructor(private batimentsS: BatimentsService,
              private joueursS: JoueursService) { }

  ngOnInit(): void {
    this.champsBle = this.batimentsS.getChampsBle();
  }

  actionBle(index: number): void {
    if (index < 0) { return; }
    this.actionBatiment(this.champsBle[index]);
  }

  actionBatiment(batiment: Batiment): void {
    if (!this.monTour) { return; }

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
