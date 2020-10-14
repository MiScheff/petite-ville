import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private idPartieSrc = new BehaviorSubject(null);
  idPartie$ = this.idPartieSrc.asObservable();

  constructor() { }

  init(idPartie: string) {
    this.idPartieSrc.next(idPartie);
  }
}
