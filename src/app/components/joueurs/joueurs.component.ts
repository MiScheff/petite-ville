import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Joueur } from 'src/app/models/joueur';
import { JoueursService } from 'src/app/services/joueurs.service';

@Component({
  selector: 'pv-joueurs',
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.sass']
})
export class JoueursComponent implements OnInit, OnDestroy {
  joueurs: Joueur[];
  joueurs$: Subscription;

  constructor(private joueursS: JoueursService) {
  }

  ngOnInit(): void {
    this.joueursS.getJoueurs().subscribe(joueurs => {
      this.joueurs = joueurs;
    });
  }

  toArray(objet): Joueur[] {
    // Transforme l'objet d'objets partie.joueur en tableau d'objets
    const tableau = [];
    const keys = Object.keys(objet);
    keys.forEach((key) => {
      tableau.push(objet[key]);
    });

    return tableau;
  }

  ngOnDestroy(): void {
    this.joueurs$.unsubscribe();
  }
}
