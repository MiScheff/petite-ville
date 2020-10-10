import { Component, OnInit } from '@angular/core';
import { CarteService } from 'src/app/services/carte.service';

@Component({
  selector: 'pv-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.sass']
})
export class CarteComponent implements OnInit {
  carte;
  constructor(private carteS: CarteService) { }

  ngOnInit(): void {
    this.carte = this.carteS.initCarte();
  }

}
