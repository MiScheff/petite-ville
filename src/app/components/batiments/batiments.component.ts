import { Component, Input, OnInit } from '@angular/core';
import { Batiment } from 'src/app/models/batiment';
import { Partie } from 'src/app/models/partie';
import { BatimentsService } from 'src/app/services/batiments.service';

@Component({
  selector: 'pv-batiments',
  templateUrl: './batiments.component.html',
  styleUrls: ['./batiments.component.sass']
})
export class BatimentsComponent implements OnInit {
  @Input() idPartie: string;
  @Input() partie: Partie;
  @Input() infosTour;

  listeBatiments: Batiment[];
  nbChampsBle: number;
  champsBle: Batiment[];

  constructor(private batimentsS: BatimentsService) { }

  ngOnInit(): void {
    this.listeBatiments = this.partie.batiments.listeBatiments;
    this.nbChampsBle = this.partie.batiments.nbChampsBle;

    this.champsBle = this.batimentsS.getChampsBle();
  }



}
