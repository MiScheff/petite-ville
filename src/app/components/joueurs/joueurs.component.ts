import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/app/models/joueur';

@Component({
  selector: 'pv-joueurs',
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.sass']
})
export class JoueursComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input() joueurs: Joueur[];

  constructor() {
  }

  ngOnInit(): void {

  }

  toArray(objet) {
    // Transforme l'objet d'objets partie.joueur en tableau d'objets
    const tableau = [];
    const keys = Object.keys(objet);
    keys.forEach((key) => {
      tableau.push(objet[key]);
    });

    return tableau;
  }

}
