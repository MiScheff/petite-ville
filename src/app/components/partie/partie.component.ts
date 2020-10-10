import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Partie } from 'src/app/models/partie';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.sass']
})
export class PartieComponent implements OnInit {
  idPartie: string;
  partie$: Observable<Partie>;

  constructor(private route: ActivatedRoute,
              private partiesS: PartiesService) {
    this.idPartie = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.partie$ = this.partiesS.getPartie(this.idPartie);
  }
}
