import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Joueur } from '../models/joueur';
import { Partie } from '../models/partie';
import { BatimentsService } from './batiments.service';
import { CartesService } from './cartes.service';

@Injectable({
  providedIn: 'root'
})
export class PartiesService {
  constructor(private db: AngularFireDatabase,
              private cartesS: CartesService,
              private batimentsS: BatimentsService) { }

  async createPartie(idJoueur) {
    const joueur = new Joueur(localStorage.getItem('nomUser'));
    const carte = this.cartesS.initCarte();
    const batiments = this.batimentsS.getRandomBatiments();

    return await this.db.list('/parties').push(new Partie(idJoueur, carte, batiments, joueur));
  }

  getPartie(idPartie: string): Observable<Partie> {
    return this.db.object('/parties/' + idPartie).valueChanges() as Observable<Partie>;
  }

  updatePartie(idPartie: string, data: object): void {
    this.db.object('/parties/' + idPartie).update(data);
  }

  addJoueur(idPartie: string, idJoueur: string, joueur: Joueur): void {
    this.db.list('/parties/' + idPartie + '/joueurs').set(idJoueur, joueur);
  }
}
