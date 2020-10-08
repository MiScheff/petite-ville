export class Joueur {
  nom: string;
  score = 0;
  ouvriers = 0;
  batiments = 0;
  pieces = 0;
  ressources = {
    pierre: 0,
    bois: 0,
    poisson: 0,
    ble: 0
  };

  constructor(nom: string) {
    this.nom = nom;
  }
}
