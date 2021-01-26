import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private ngFireAuth: AngularFireAuth) {
    this.user$ = this.ngFireAuth.authState;
  }

  signin(): void {
    this.ngFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  signout(): void {
    this.ngFireAuth.signOut();
    localStorage.clear();
  }

  get user(): Observable<Utilisateur> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user){ return of({id: user.uid, nom: user.displayName.split(' ')[0]}); }
        return of(null);
      })
    );
  }
}
