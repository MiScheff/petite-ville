import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/app/models/joueur';
import { JoueursService } from 'src/app/services/joueurs.service';

@Component({
  selector: 'pv-joueurs',
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.sass']
})
export class JoueursComponent implements OnInit {
  joueurs: Joueur[];

  constructor(private joueursS: JoueursService) {
  }

  ngOnInit(): void {
    this.joueursS.getJoueurs().subscribe(joueurs => {
      this.joueurs = joueurs;
    });
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
