import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { routes } from 'src/app/app.routes';
import { JoueursService } from 'src/app/services/joueurs.service';
import { environment } from 'src/environments/environment';

import { JoueursComponent } from './joueurs.component';

describe('JoueursComponent', () => {
  let component: JoueursComponent;
  let fixture: ComponentFixture<JoueursComponent>;
  let joueursService: JoueursService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoueursComponent ],

      imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        RouterModule.forRoot(routes),
        NotifierModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueursComponent);
    component = fixture.componentInstance;
    joueursService = TestBed.inject(JoueursService);
    fixture.detectChanges();

    component.detailsJoueur = {
      nom: 'Michel', batiments: 0, ouvriers: 0, ressources: {
        piece: 10, score: 0, pierre: 0, bois: 0, poisson: 0, ble: 0
      }
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('acheterRessource', () => {
    it('should add 1 wood selected and substract 3 coins when I have at least 3 coins', () => {
      component.acheterRessource('bois');
      expect(component.detailsJoueur.ressources).toEqual({piece: 7, score: 0, pierre: 0, bois: 1, poisson: 0, ble: 0});
    });

    it('should not add anything if I haven\'t at least 3 coins', () => {
      component.detailsJoueur.ressources.piece = 2;
      component.acheterRessource('bois');
      expect(component.detailsJoueur.ressources).toEqual({piece: 2, score: 0, pierre: 0, bois: 0, poisson: 0, ble: 0});
    });
  });
});
