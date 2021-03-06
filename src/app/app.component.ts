import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Utilisateur } from './models/utilisateur';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'pv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'petite-ville';

  constructor(private authS: AuthService,
              private usersS: UsersService,
              private router: Router) {
    console.log('Connexion...');

    this.authS.user.subscribe((user) => {
      if (user) {
        this.saveUser(user);
        console.log('Connecté');

        this.navigateUser();
      }
      else {
        console.log('Non connecté');
      }
    });
  }

  private saveUser(user: Utilisateur) {
    localStorage.setItem('idUser', user.id);
    localStorage.setItem('nomUser', user.nom);
    this.usersS.save(user);
  }

  private navigateUser() {
    const returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl) {
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    }
  }
}
