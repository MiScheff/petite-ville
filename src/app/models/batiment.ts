export interface Batiment {
  nom: string;
  image: string;

  cout: {
    type: string;
    quantite: number;
  }[];
  entree: {
    type: string;
    quantite: number;
  }[];
  sortie: {
    type: string;
    quantite: number;
  }[];

  score: number;
  disponible: boolean;
  position: {
    x: number;
    y: number;
  };
  activable: boolean;
}
