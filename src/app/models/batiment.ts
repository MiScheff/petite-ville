import { Ressources } from './ressources';

export interface Batiment {
  nom: string;
  image: string;

  cout: Partial<Ressources>;
  entree: Partial<Ressources>;
  sortie: Partial<Ressources>;

  score: number;
  disponible: boolean;
  position: {
    x: number;
    y: number;
  };
  activable: boolean;
}
