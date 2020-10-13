import { Component, Input, OnInit } from '@angular/core';
import { Batiment } from 'src/app/models/batiment';
import { Partie } from 'src/app/models/partie';
import { Joueur } from 'src/app/models/joueur';
import { BatimentsService } from 'src/app/services/batiments.service';

@Component({
  selector: 'pv-batiments',
  templateUrl: './batiments.component.html',
  styleUrls: ['./batiments.component.sass']
})
export class BatimentsComponent implements OnInit {
  @Input() idPartie: string;
  @Input() batiments;
  @Input() joueurActif;
  @Input() joueurs: Joueur[];
  @Input() infosTour;

  champsBle: Batiment[];

  constructor(private batimentsS: BatimentsService) { }

  ngOnInit(): void {
    this.champsBle = this.batimentsS.getChampsBle();
  }

  actionBle(index: number): void {
    if (index < 0) { return; }
    this.actionBatiment(this.champsBle[index]);
  }

  actionBatiment(batiment: Batiment): void {
    if (!this.infosTour.monTour) { return; }

    console.log(this.ressourcesSuffisantes(batiment.cout));
  }

  ressourcesSuffisantes(cout: { type, quantite }[] ) {
    let assez = true;

    for (let i = 0; i < cout.length && assez; i++) {
      assez = this.joueurs[this.joueurActif.id].ressources[cout[i].type] >= cout[i].quantite;
    }

    return assez;
  }




}
