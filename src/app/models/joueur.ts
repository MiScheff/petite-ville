export class Joueur {
  nom: string;
  ouvriers = 0;
  batiments = 0;
  ressources = {
    piece: 3,
    pierre: 0,
    bois: 0,
    poisson: 0,
    ble: 0,
    score: 0
  };

  constructor(nom: string) {
    this.nom = nom;
  }
}
