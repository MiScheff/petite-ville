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
    this.joueurs$ = this.joueursS.getJoueurs().subscribe(joueurs => {
      this.joueurs = joueurs;
    });
  }

  ngOnDestroy(): void {
    this.joueurs$.unsubscribe();
  }
}
