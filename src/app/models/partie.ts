import { Batiment } from './batiment';
import { Joueur } from './joueur';

export class Partie {
  carte: string[];
  batiments: {
    listeBatiments: Batiment[];
    nbMaxBatiments: number;
    nbChampsBle: number;
  };
  joueurs: Joueur[] = [];

  joueurActif: string;
  evenements: string[] = [];
  manche = 1;
  dateDebut: Date;
  dateFin: Date;

  constructor(idCreateur: string, carte: string[], batiments: Batiment[], joueur: Joueur) {
    this.carte = carte;
    this.batiments = {
      listeBatiments: batiments,
      nbMaxBatiments: 7,
      nbChampsBle: 5
    };
    this.joueurActif = idCreateur;
    this.joueurs[idCreateur] = joueur;
    this.evenements.push(joueur.nom + ' a créé la partie.');
  }
}
