import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartiesService } from 'src/app/services/parties.service';

@Component({
  selector: 'pv-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private partiesS: PartiesService) { }

  ngOnInit(): void {
  }

  async newGame() {
    const partieID = (await this.partiesS.createPartie()).key;
    this.router.navigate(['/partie/', partieID]);
  }

}
