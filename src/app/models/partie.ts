import { Batiment } from './batiment';
import { Case } from './case';
import { InfosBatiments } from './infosBatiments';
import { InfosPartie } from './infosPartie';
import { Joueur } from './joueur';
import { JoueurActif } from './joueurActif';

export class Partie {
  carte: Case[][];
  batiments: InfosBatiments;
  joueurs: Joueur[] = [];
  joueurActif: JoueurActif;
  evenements: string[] = [];
  infosPartie: InfosPartie;

  constructor(idCreateur: string, carte: Case[][], batiments: Batiment[], joueur: Joueur) {
    this.carte = carte;
    this.batiments = {
      listeBatiments: batiments,
      nbMaxBatiments: 0,
      nbChampsBle: 5
    };
    this.joueurActif = {
      id: idCreateur,
      nom: joueur.nom,
      aJoue: false,
      batimentChoisi: null
    };
    this.joueurs[idCreateur] = joueur;
    this.evenements.push(joueur.nom + ' a créé la partie.');
    this.infosPartie = {
      manche: 1,
      dateDebut: null,
      dateFin: null
    };
  }
}
