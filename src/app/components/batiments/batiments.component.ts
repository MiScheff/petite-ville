import { Component, OnInit } from '@angular/core';
import { Batiment } from 'src/app/models/batiment';
import { BatimentsService } from 'src/app/services/batiments.service';

@Component({
  selector: 'pv-batiments',
  templateUrl: './batiments.component.html',
  styleUrls: ['./batiments.component.sass']
})
export class BatimentsComponent implements OnInit {
  batiments: Batiment[];
  champsBle: Batiment[];
  champsDispo: number;

  constructor(private batimentsS: BatimentsService) { }

  ngOnInit(): void {
    // TODO: à déplacer dans partie component ou service lors de l'initialisation de la partie
    this.batiments = this.batimentsS.getRandomBatiments();
    this.champsBle = this.batimentsS.getChampsBle();
    this.champsDispo = this.champsBle.length;
  }

}
