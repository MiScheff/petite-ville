export class Joueur {
  nom: string;
  score = 0;
  ouvriers = 0;
  batiments = 0;
  ressources = {
    pieces: 3,
    pierre: 0,
    bois: 0,
    poisson: 0,
    ble: 0
  };

  constructor(nom: string) {
    this.nom = nom;
  }
}
