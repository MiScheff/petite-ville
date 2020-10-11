import { Component, Input, OnInit } from '@angular/core';
import { Batiment } from 'src/app/models/batiment';
import { BatimentsService } from 'src/app/services/batiments.service';

@Component({
  selector: 'pv-batiments',
  templateUrl: './batiments.component.html',
  styleUrls: ['./batiments.component.sass']
})
export class BatimentsComponent implements OnInit {
  @Input() batiments;

  listeBatiments: Batiment[];
  nbChampBle: number;
  nbMaxBatiment: number;
  champsBle: Batiment[];

  constructor(private batimentsS: BatimentsService) { }

  ngOnInit(): void {
    this.listeBatiments = this.batiments.listeBatiments;
    this.nbMaxBatiment = this.batiments.nbMaxBatiment;
    this.nbChampBle = this.batiments.nbChampBle;

    this.champsBle = this.batimentsS.getChampsBle();
  }

}
