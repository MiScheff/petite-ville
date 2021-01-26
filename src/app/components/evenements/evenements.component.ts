import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EvenementsService } from 'src/app/services/evenements.service';

@Component({
  selector: 'pv-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.sass']
})
export class EvenementsComponent implements OnInit, OnDestroy {
  evenements: string[];
  evenements$: Subscription;

  constructor(private evenementsS: EvenementsService) { }

  ngOnInit(): void {
    this.evenements$ = this.evenementsS.getEvenements().subscribe(evenements => this.evenements = evenements.reverse());
  }

  ngOnDestroy(): void {
    this.evenements$.unsubscribe();
  }

}
