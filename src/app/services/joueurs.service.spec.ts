import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { routes } from '../app.routes';

import { JoueursService } from './joueurs.service';

describe('JoueursService', () => {
  let service: JoueursService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        RouterModule.forRoot(routes),
        NotifierModule
      ],
    });
    service = TestBed.inject(JoueursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
