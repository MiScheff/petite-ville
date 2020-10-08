import { Joueur } from './joueur';

export class Partie {
  joueurs: Joueur[] = [];
  joueurActif: string;
  manche: number;
  dateDebut: Date;
  dateFin: Date;
  dernieresActions: string[] = [];

  constructor(joueur: Joueur) {
    this.joueurActif = 'joueurID'; // TODO: récupérer l'idUser dans le LocalStorage
    this.joueurs['joueurID'] = joueur;
    this.dernieresActions.push(joueur.nom + ' a créé la partie.');
  }
}
