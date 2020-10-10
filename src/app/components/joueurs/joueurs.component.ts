import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/app/models/joueur';

@Component({
  selector: 'pv-joueurs',
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.sass']
})
export class JoueursComponent implements OnInit {
  @Input() joueurs: Joueur[];
  list = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.joueurs);
  }

}
