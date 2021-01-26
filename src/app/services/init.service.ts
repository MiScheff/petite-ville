import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private idPartieSrc = new BehaviorSubject(null);
  idPartie$ = this.idPartieSrc.asObservable();

  constructor() { }

  // TODO: Voir si on peut récupérer l'objet partie ici pour le découper en différents BehaviorSubject
  // Ainsi, on ne fait qu'un appel à la base de données, et tous les subscribe() des services pointeront ici.
  init(idPartie: string): void {
    this.idPartieSrc.next(idPartie);
  }

}
