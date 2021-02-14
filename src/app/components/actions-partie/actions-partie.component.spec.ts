import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { BehaviorSubject } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { routes } from 'src/app/app.routes';
import { environment } from 'src/environments/environment';

import { ActionsPartieComponent } from './actions-partie.component';

describe('ActionsPartieComponent', () => {
  let component: ActionsPartieComponent;
  let fixture: ComponentFixture<ActionsPartieComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsPartieComponent ],

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
    fixture = TestBed.createComponent(ActionsPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getParameter', () => {
    it('should return the good parameter when 2 players', () => {
      component.nbJoueurs = 2;
      expect(component.getParametres()).toEqual({nbMaxOuvriers: 5, nbMaxBatiments: 7});
    });

    it('should return the good parameter when 3 players', () => {
      component.nbJoueurs = 3;
      expect(component.getParametres()).toEqual({nbMaxOuvriers: 4, nbMaxBatiments: 6});
    });

    it('should return the good parameter when 4 players', () => {
      component.nbJoueurs = 4;
      expect(component.getParametres()).toEqual({nbMaxOuvriers: 3, nbMaxBatiments: 6});
    });
  });

  describe('nourrirOuvrier', () => {
    beforeEach(() => {
      component.detailsJoueur = { nom: '', ouvriers: 5, batiments: 5, ressources: null};
      component.detailsJoueur.ressources = {
        poisson: 5,
        ble: 5,
        pierre: 5,
        bois: 5,
        score: 0,
        piece: 5
      }
    });

    it('should use 1 poisson', () => {
      component.nourrirOuvrier('poisson');
      expect(component.detailsJoueur.ressources).toEqual({
        poisson: 4,
        ble: 5,
        pierre: 5,
        bois: 5,
        score: 0,
        piece: 5
      });
    });
    it('should use 1 blé', () => {
      component.nourrirOuvrier('ble');
      expect(component.detailsJoueur.ressources).toEqual({
        poisson: 5,
        ble: 4,
        pierre: 5,
        bois: 5,
        score: 0,
        piece: 5
      });
    });
    it('should use 3 pièces', () => {
      component.nourrirOuvrier('piece');
      expect(component.detailsJoueur.ressources).toEqual({
        poisson: 5,
        ble: 5,
        pierre: 5,
        bois: 5,
        score: 0,
        piece: 2
      });
    });
    it('should use 3 score points', () => {
      component.nourrirOuvrier('score');
      expect(component.detailsJoueur.ressources).toEqual({
        poisson: 5,
        ble: 5,
        pierre: 5,
        bois: 5,
        score: -3,
        piece: 5
      });
    });

    it('should not use bois', () => {
      component.nourrirOuvrier('bois');
      expect(component.detailsJoueur.ressources).toEqual({
        poisson: 5,
        ble: 5,
        pierre: 5,
        bois: 5,
        score: 0,
        piece: 5
      });
    });
    it('should not use pierre', () => {
      component.nourrirOuvrier('pierre');
      expect(component.detailsJoueur.ressources).toEqual({
        poisson: 5,
        ble: 5,
        pierre: 5,
        bois: 5,
        score: 0,
        piece: 5
      });
    });
    it('should not use piece if piece < 3', () => {
      component.detailsJoueur.ressources.piece = 2;
      component.nourrirOuvrier('piece');
      expect(component.detailsJoueur.ressources).toEqual({
        poisson: 5,
        ble: 5,
        pierre: 5,
        bois: 5,
        score: 0,
        piece: 2
      });
    });
  });
});
