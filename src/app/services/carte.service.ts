import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  carte = []; // La carte fait 6 cases de haut (y) et 9 cases de large (x)


  constructor() { }

  initCarte() {
    // tous les tableaux sont de type array[y][x];
    const casesPierre = ['0,0', '0,3', '0,7', '0,8'];
    const casesBois = ['0,2', '3,0', '4,6', '5,1', '5,2', '5,8'];
    const casesEau = ['0,5', '2,0', '3,8', '5,4', '5,5'];

    for (let y = 0; y < 6; y++) {
      this.carte[y] = [];
      for (let x = 0; x < 9; x++) {
        const currentCase = { x, y, isEmpty: true, content: null };
        if (casesPierre.indexOf(y + ',' + x) !== -1) {
          currentCase.content = 'pierre';
        } else if (casesBois.indexOf(y + ',' + x) !== -1) {
          currentCase.content = 'bois';
        } else if (casesEau.indexOf(y + ',' + x) !== -1) {
          currentCase.content = 'eau';
        }

        this.carte[y][x] = currentCase;
      }
    }

    return this.carte;
  }
}