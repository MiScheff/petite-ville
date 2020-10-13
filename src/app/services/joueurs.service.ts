import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Ressources } from '../models/ressources';

@Injectable({
  providedIn: 'root'
})
export class JoueursService {

  constructor(private db: AngularFireDatabase) {
  }
}
