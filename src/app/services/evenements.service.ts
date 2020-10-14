import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { InitService } from './init.service';
import { PartiesService } from './parties.service';

@Injectable({
  providedIn: 'root'
})
export class EvenementsService {
  idPartie: string;

  constructor(private initS: InitService,
              private db: AngularFireDatabase) {
    this.initS.idPartie$.subscribe(id => this.idPartie = id);
  }

  addEvenements(messageEvenement: string) {
    this.db.list('/parties/' + this.idPartie + '/evenements').push(messageEvenement);
  }
}
