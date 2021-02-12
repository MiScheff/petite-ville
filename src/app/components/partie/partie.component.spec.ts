import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { routes } from 'src/app/app.routes';
import { environment } from 'src/environments/environment';

import { PartieComponent } from './partie.component';

describe('PartieComponent', () => {
  let component: PartieComponent;
  let fixture: ComponentFixture<PartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieComponent ],

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
    fixture = TestBed.createComponent(PartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.user = {id: 'XXX', nom: 'Michel'};
    component.joueurs = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('participe', () => {
    it('should return false if no user infos', () => {
      component.user = null;
      expect(component.participe()).toBeFalse();
    });

    it('should return false if user isn\'t in the list of players', () => {
      component.joueurs['YYY'] = [{nom: 'Jean'}];
      expect(component.participe()).toBeFalse();
    });

    it('should return true if user is in the list of players', () => {
      component.joueurs['XXX'] = [{nom: 'Michel'}];
      expect(component.participe()).toBeTrue();
    });
  });

  describe('etatPartie', () => {
    beforeEach(() => {
      component.infosPartie = {manche: null, finManche: null, nbMaxOuvriers: 5, dateDebut: null, dateFin: null}

    });
    it('should return "En cours" if there is a dateDebut', () => {
      component.infosPartie.dateDebut = new Date();
      expect(component.etatPartie()).toEqual('En cours');
    });

    it('should return "Finie" if there is a dateFin', () => {
      component.infosPartie.dateFin = new Date();
      expect(component.etatPartie()).toEqual('Finie');
    });

    it('should return "Non commencée" if there is no dateDebut nor dateFin', () => {
      expect(component.etatPartie()).toEqual('Non commencée');
    });
  });
});
