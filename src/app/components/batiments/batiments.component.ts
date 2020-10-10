import { Component, Input, OnInit } from '@angular/core';
import { Batiment } from 'src/app/models/batiment';
import { BatimentsService } from 'src/app/services/batiments.service';

@Component({
  selector: 'pv-batiments',
  templateUrl: './batiments.component.html',
  styleUrls: ['./batiments.component.sass']
})
export class BatimentsComponent implements OnInit {
  @Input() champsDispo: number;
  @Input() nbMaxBatiment: number;
  @Input() batiments: Batiment[];
  champsBle: Batiment[];

  constructor(private batimentsS: BatimentsService) { }

  ngOnInit(): void {
    this.champsBle = this.batimentsS.getChampsBle();
  }

}
