import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Joueur } from '../models/joueur';
import { Partie } from '../models/partie';

@Injectable({
  providedIn: 'root'
})
export class PartiesService {

  constructor(private db: AngularFireDatabase) { }

  async createPartie() {
    return await this.db.list('/parties').push(new Partie(new Joueur('Mich')));
  }
}
