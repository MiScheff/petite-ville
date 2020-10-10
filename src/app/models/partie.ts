import { Joueur } from './joueur';

export class Partie {
  joueurs: Joueur[] = [];
  joueurActif: string;
  manche: number;
  dateDebut: Date;
  dateFin: Date;
  dernieresActions: string[] = [];

  constructor(joueur: Joueur, idJoueur) {
    this.joueurActif = idJoueur;
    this.joueurs[idJoueur] = joueur;
    this.dernieresActions.push(joueur.nom + ' a créé la partie.');
  }
}
