import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'petite-ville';
  
  constructor(private db: AngularFireDatabase) {
  }

  createTest() {
    this.db.list('/test').push({ str: 'Coucou' });
  }
}
