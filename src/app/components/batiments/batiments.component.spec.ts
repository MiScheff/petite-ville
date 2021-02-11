import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { routes } from 'src/app/app.routes';
import { Batiment } from 'src/app/models/batiment';
import { environment } from 'src/environments/environment';

import { BatimentsComponent } from './batiments.component';

describe('BatimentsComponent', () => {
  let component: BatimentsComponent;
  let fixture: ComponentFixture<BatimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatimentsComponent ],

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
    fixture = TestBed.createComponent(BatimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('actionBatiment', () => {
    let bat = {nom: 'Atelier', image: null, entree: {pierre: 1}, sortie: {piece: 3}, cout: null, score: 3, disponible: true, position: null, activable: true};
    bat.cout = 2;

    beforeEach(() => {
      component.monTour = true;
      component.joueurActif = {id: null, nom: null, batimentChoisi: null, ouvriersANourrir: null, aJoue: false};
      component.detailsJoueur = {nom: null, ouvriers: null, batiments: 2, ressources: null};
      component.batiments = {listeBatiments: null, nbChampsBle: null, nbMaxBatiments: 5};
      bat.disponible = true;
    });

    it('should select a batiment', () => {
      component.actionBatiment(bat);
      expect(component.joueurActif.batimentChoisi).toEqual(bat);
    });

    it('should not select a batiment if not my turn', () => {
      component.monTour = false;
      component.actionBatiment(bat);
      expect(component.joueurActif.batimentChoisi).toEqual(null);
    });
    it('should not select a batiment if I already played', () => {
      component.joueurActif.aJoue = true;
      component.actionBatiment(bat);
      expect(component.joueurActif.batimentChoisi).toEqual(null);
    });
    it('should not select a batiment if I reached the batiments limit', () => {
      component.batiments.nbMaxBatiments = 2;
      component.actionBatiment(bat);
      expect(component.joueurActif.batimentChoisi).toEqual(null);
    });
    it('should not select a batiment if it\'s not available', () => {
      bat.disponible = false;
      component.actionBatiment(bat);
      expect(component.joueurActif.batimentChoisi).toEqual(null);
    });
  });

  describe('annuleChoixBatiment', () => {
    beforeEach(() => {
      let bat = {nom: 'Atelier', image: null, entree: {pierre: 1}, sortie: {piece: 3}, cout: null, score: 3, disponible: true, position: null, activable: true};
      component.joueurActif = {id: null, nom: null, batimentChoisi: bat, ouvriersANourrir: null, aJoue: false};
    });
    
    it('should delete the selected batiment', () => {
      component.annuleChoixBatiment();
      expect(component.joueurActif.batimentChoisi).toBe(null);
    })
  })
});
