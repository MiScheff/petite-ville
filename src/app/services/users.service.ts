import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFireDatabase) { }

  save(user) {
    this.db.object('/users/' + user.id).update({ nom: user.nom });
  }

  get(userId) {
    return this.db.object('/users/' + userId).valueChanges();
  }
}
