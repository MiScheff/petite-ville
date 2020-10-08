import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pv-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.sass']
})
export class PartieComponent implements OnInit {
  idPartie: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idPartie = this.route.snapshot.paramMap.get('id');
  }

}
