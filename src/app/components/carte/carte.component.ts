import { Component, Input, OnInit } from '@angular/core';
import { CartesService } from 'src/app/services/cartes.service';

@Component({
  selector: 'pv-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.sass']
})
export class CarteComponent implements OnInit {
  @Input() carte: string[];
  constructor(private carteS: CartesService) { }

  ngOnInit(): void {
  }

}
