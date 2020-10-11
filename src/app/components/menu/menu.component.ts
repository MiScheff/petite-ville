import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit, OnDestroy {
  idJoueur: string;

  user$: Subscription;

  constructor(private router: Router,
              private partiesS: PartiesService,
              private authS: AuthService) { }

  ngOnInit(): void {
    // Vérifie si l'utilisateur est connecté
    this.user$ = this.authS.user$.subscribe(user => {
      this.idJoueur = user ? user.uid : null;
    });
  }

  async nouvellePartie() {
    const partieID = (await this.partiesS.createPartie(this.idJoueur)).key;
    this.router.navigate(['/partie/', partieID]);
  }

  connexion() {
    this.authS.signin();
  }

  deconnexion() {
    this.authS.signout();
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }
}
