import { Component, OnInit } from '@angular/core';
import { EvenementsService } from 'src/app/services/evenements.service';

@Component({
  selector: 'pv-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.sass']
})
export class EvenementsComponent implements OnInit {
  evenements: string[];

  constructor(private evenementsS: EvenementsService) { }

  ngOnInit(): void {
    this.evenementsS.getEvenements().subscribe(evenements => this.evenements = evenements);
  }

}
