import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Joueur } from 'src/app/models/joueur';
import { Partie } from 'src/app/models/partie';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.sass']
})
export class PartieComponent implements OnInit {
  idPartie: string;
  idUser: string;

  partie: Partie;

  constructor(private route: ActivatedRoute,
              private partiesS: PartiesService) {
    this.idPartie = this.route.snapshot.paramMap.get('id');
    this.idUser = localStorage.getItem('idUser');
  }

  ngOnInit(): void {
    this.partiesS.getPartie(this.idPartie).subscribe((partie) => {
      // console.log(partie);
      this.partie = partie;
    });
  }

  participe(): boolean {
    const listeJoueurs = Object.keys(this.partie.joueurs);
    return listeJoueurs.indexOf(this.idUser) !== -1 ? true : false;
  }

  rejoindre(): void {
    const nom = localStorage.getItem('nomUser');
    this.partiesS.addJoueur(this.idPartie, this.idUser, new Joueur(nom));
  }

  nbJoueurs(): number {
    const listeJoueurs = Object.keys(this.partie.joueurs);
    return listeJoueurs.length;
  }

}
