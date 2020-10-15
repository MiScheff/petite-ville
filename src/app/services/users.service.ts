import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFireDatabase) { }

  save(user: Utilisateur) {
    this.db.object('/users/' + user.id).update({ nom: user.nom });
  }

}
