import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InfosPartie } from 'src/app/models/infosPartie';
import { Joueur } from 'src/app/models/joueur';
import { Utilisateur } from 'src/app/models/utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { InitService } from 'src/app/services/init.service';
import { JoueursService } from 'src/app/services/joueurs.service';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.sass']
})
export class PartieComponent implements OnInit, OnDestroy {
  idPartie: string;

  user: Utilisateur;
  infosPartie: InfosPartie;
  joueurs: Joueur[];

  monTour = false;

  infosPartie$: Subscription;
  joueurs$: Subscription;
  joueurActif$: Subscription;
  user$: Subscription;

  constructor(private route: ActivatedRoute,
              private partiesS: PartiesService,
              private joueursS: JoueursService,
              private authS: AuthService,
              private initS: InitService) {
    this.idPartie = this.route.snapshot.paramMap.get('id');
    this.user$ = this.authS.user.subscribe((user: Utilisateur) => this.user = user);
    this.initS.init(this.idPartie);
  }

  ngOnInit(): void {
    this.infosPartie$ = this.partiesS.getInfosPartie().subscribe(infosPartie => this.infosPartie = infosPartie);
    this.joueurs$ = this.joueursS.getJoueurs().subscribe(joueurs => this.joueurs = joueurs);
    this.joueurActif$ = this.joueursS.getJoueurActif().subscribe(joueurActif => {
      this.monTour = this.user.id === joueurActif.id ? true : false;
    });
  }

  participe(): boolean {
    if (!this.user) { return false; }

    const listeJoueurs = Object.keys(this.joueurs);
    return listeJoueurs.indexOf(this.user.id) !== -1 ? true : false;
  }

  etatPartie(): string {
    if (this.infosPartie.dateFin) { return 'Finie'; }
    else if (this.infosPartie.dateDebut) { return 'En cours'; }
    else { return 'Non commencée'; }
  }

  ngOnDestroy(): void {
    this.infosPartie$.unsubscribe();
    this.joueurs$.unsubscribe();
    this.joueurActif$.unsubscribe();
    this.user$.unsubscribe();
  }

}
