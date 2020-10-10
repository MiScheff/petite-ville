import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  idJoueur: string;

  constructor(private router: Router,
              private partiesS: PartiesService,
              private authS: AuthService) { }

  ngOnInit(): void {
    // Vérifie si l'utilisateur est connecté
    this.authS.user$.subscribe(user => {
      this.idJoueur = user ? user.uid : null;
    });
  }

  async newGame() {

    const partieID = (await this.partiesS.createPartie(this.idJoueur)).key;
    this.router.navigate(['/partie/', partieID]);
  }

  signIn() {
    this.authS.signin();
  }

  signOut() {
    this.authS.signout();
  }

}
