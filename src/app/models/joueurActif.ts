import { Batiment } from './batiment';

export interface JoueurActif {
  id: string;
  nom: string;
  aJoue: boolean;
  batimentChoisi: Batiment;
}
