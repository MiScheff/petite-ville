import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { routes } from 'src/app/app.routes';
import { Case } from 'src/app/models/case';
import { BatimentsService } from 'src/app/services/batiments.service';
import { CartesService } from 'src/app/services/cartes.service';
import { InitService } from 'src/app/services/init.service';
import { JoueursService } from 'src/app/services/joueurs.service';
import { environment } from 'src/environments/environment';

import { CarteComponent } from './carte.component';

describe('CarteComponent', () => {
  let component: CarteComponent;
  let batService: BatimentsService;
  let carteService: CartesService;
  let joueursService: JoueursService;
  let fixture: ComponentFixture<CarteComponent>;

  let caseTestVide: Case;
  let caseVide: Case;
  let caseTestPleine: Case;
  let casePleine: Case;
  let caseEpicerie: Case;
  let epicerie;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteComponent ],

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
    fixture = TestBed.createComponent(CarteComponent);
    component = fixture.componentInstance;
    batService = TestBed.inject(BatimentsService);
    carteService = TestBed.inject(CartesService);
    joueursService = TestBed.inject(JoueursService);
    fixture.detectChanges();

    batService.batiments$.next({
      listeBatiments: [
        {
          activable: true,
          cout: {bois: 2},
          disponible: false,
          entree: {piece: 1},
          nom: 'Epicerie',
          score: 4,
          sortie: {ble: 1, poisson: 1},
          image: null,
          position: null
        }
      ],
      nbMaxBatiments: 7,
      nbChampsBle: 5
    });

    carteService.batimentsActionnables = ['3,4'];

    epicerie = {
      activable: true,
      cout: {bois: 2},
      disponible: false,
      entree: {piece: 1},
      nom: 'Epicerie',
      score: 4,
      sortie: {ble: 1, poisson: 1},
      image: null,
      position: null
    };

    component.carte = [
      [
        { x: 0, y: 0, content: { type: 'pierre', } },
        { x: 1, y: 0, content: null },
        { x: 2, y: 0, content: { type: 'bois', } },
        { x: 3, y: 0, content: { type: 'pierre', } },
        { x: 4, y: 0, content: null },
        { x: 5, y: 0, content: { type: 'poisson', } },
        { x: 6, y: 0, content: null },
        { x: 7, y: 0, content: { type: 'pierre', } },
        { x: 8, y: 0, content: { type: 'pierre', } },
      ],
      [
        { x: 0, y: 1, content: null },
        { x: 1, y: 1, content: null },
        { x: 2, y: 1, content: null },
        { x: 3, y: 1, content: null },
        { x: 4, y: 1, content: null },
        { x: 5, y: 1, content: { indexJ: 'J0', proprietaire: 'O9ex7MQ6J3T5MA5s1H0flqbLnmk1', type: 'ouvrier', } },
        { x: 6, y: 1, content: null },
        { x: 7, y: 1, content: { indexJ: 'J0', proprietaire: 'O9ex7MQ6J3T5MA5s1H0flqbLnmk1', type: 'ouvrier', } },
        { x: 8, y: 1, content: null },
      ],
      [
        { x: 0, y: 2, content: { type: 'poisson', } },
        { x: 1, y: 2, content: null },
        { x: 2, y: 2, content: null },
        { x: 3, y: 2, content: null },
        { x: 4, y: 2, content: null },
        { x: 5, y: 2, content: null },
        { x: 6, y: 2, content: null },
        { x: 7, y: 2, content: null },
        { x: 8, y: 2, content: null },
      ],
      [
        { x: 0, y: 3, content: { type: 'bois', } },
        { x: 1, y: 3, content: null },
        { x: 2, y: 3, content: null },
        { x: 3, y: 3, content: null },
        { x: 4, y: 3, content: { batiment: epicerie, indexJ: 'J0', proprietaire: 'O9ex7MQ6J3T5MA5s1H0flqbLnmk1', type: 'batiment', } },
        { x: 5, y: 3, content: null },
        { x: 6, y: 3, content: null },
        { x: 7, y: 3, content: { indexJ: 'J1', proprietaire: 'gX2eXTGkY3P98nPbA0har0qmcCZ2', type: 'ouvrier', } },
        { x: 8, y: 3, content: { type: 'poisson', } },
      ],
      [
        { x: 0, y: 4, content: null },
        { x: 1, y: 4, content: null },
        { x: 2, y: 4, content: null },
        { x: 3, y: 4, content: { indexJ: 'J0', proprietaire: 'O9ex7MQ6J3T5MA5s1H0flqbLnmk1', type: 'ouvrier', } },
        { x: 4, y: 4, content: { indexJ: 'J1', proprietaire: 'gX2eXTGkY3P98nPbA0har0qmcCZ2', type: 'ouvrier', } },
        { x: 5, y: 4, content: { indexJ: 'J1', proprietaire: 'gX2eXTGkY3P98nPbA0har0qmcCZ2', type: 'ouvrier', } },
        { x: 6, y: 4, content: { type: 'bois', } },
        { x: 7, y: 4, content: null },
        { x: 8, y: 4, content: null },
      ],
      [
        { x: 0, y: 5, content: null },
        { x: 1, y: 5, content: { type: 'bois', } },
        { x: 2, y: 5, content: { type: 'bois', } },
        { x: 3, y: 5, content: null },
        { x: 4, y: 5, content: { type: 'poisson', } },
        { x: 5, y: 5, content: { type: 'poisson', } },
        { x: 6, y: 5, content: null },
        { x: 7, y: 5, content: null },
        { x: 8, y: 5, content: { type: 'bois', } },
      ],
    ];

    component.monTour = true;
    component.joueurActif = {
      id: 'O9ex7MQ6J3T5MA5s1H0flqbLnmk1',
      nom: 'Michel',
      aJoue: false,
      batimentChoisi: null,
      ouvriersANourrir: 0
    };
    component.detailsJoueur = {
      nom: 'Michel',
      ouvriers: 5,
      batiments: 1,
      ressources: {
        piece: 5, pierre: 5, bois: 5, poisson: 5, ble: 5, score: 5
      }
    };
    component.batiments = {
      listeBatiments: null,
      nbMaxBatiments: 7,
      nbChampsBle: 5
    };

    caseTestVide = component.carte[0][1];
    caseVide = {x: caseTestVide.x, y: caseTestVide.y, content: null};

    caseTestPleine = component.carte[0][0];
    casePleine = {x: caseTestPleine.x, y: caseTestPleine.y, content: caseTestPleine.content};

    caseEpicerie = component.carte[3][4];

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('actionCase', () => {
    it('should call placerOuvrier()', () => {
      const spy = spyOn(component, 'placerOuvrier').and.callFake(() => null);
      component.actionCase(caseTestVide);
      expect(spy).toHaveBeenCalled();
    });

    it('should call placerBatiment()', () => {
      component.joueurActif.batimentChoisi = epicerie;
      const spy = spyOn(component, 'placerBatiment').and.callFake(() => null);
      component.actionCase(caseTestVide);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('placerOuvrier', () => {
    it('should place a worker when I haven\'t reached the max nb of workers and the cell is empty', () => {
      component.placerOuvrier(caseTestVide);
      expect(caseTestVide).toEqual({x: caseTestVide.x, y: caseTestVide.y, content: { indexJ: 'J-1', proprietaire: 'O9ex7MQ6J3T5MA5s1H0flqbLnmk1', type: 'ouvrier' } });
    });

    it('should not place a worker when I reached the max nb of workers', () => {
      component.detailsJoueur.ouvriers = 0;
      component.placerOuvrier(caseTestVide);
      expect(caseTestVide).toEqual(caseVide);
    });

    it('should not place a worker when the cell is not empty', () => {
      component.joueurActif.aJoue = true;
      component.placerOuvrier(caseEpicerie);
      expect(caseTestPleine).toEqual(casePleine);
    });

  });

  describe('placerBatiment', () => {
    beforeEach(() => {
      caseEpicerie.x = caseTestVide.x;
      caseEpicerie.y = caseTestVide.y;
      caseEpicerie.content.indexJ = 'J-1';
    });

    it('should place a building when I haven\'t reached the nb max of buildings and the cell is empty', () => {
      component.placerBatiment(caseTestVide, epicerie);
      expect(caseTestVide).toEqual(caseEpicerie);
    });

    it('should update player\'s score', () => {
      const score = component.detailsJoueur.ressources.score;
      const newScore = score + epicerie.score;
      component.placerBatiment(caseTestVide, epicerie);
      expect(component.detailsJoueur.ressources.score).toBe(newScore);
    });

    it('should update player\'s nb of worker', () => {
      component.placerBatiment(caseTestVide, epicerie);
      expect(component.detailsJoueur.ouvriers).toBe(4);
    });

    it('should set aJoue to true', () => {
      component.placerBatiment(caseTestVide, epicerie);
      expect(component.joueurActif.aJoue).toBe(true);
    });

    it('should not place a building when I have reached the nb max of buildings', () => {
      component.detailsJoueur.batiments = component.batiments.nbMaxBatiments;
      component.placerBatiment(caseTestVide, epicerie);
      expect(caseTestVide).toEqual(caseVide);
    });

    it('should not place a building when the cell is not empty', () => {
      component.joueurActif.aJoue = true;
      component.placerBatiment(caseTestVide, epicerie);
      expect(caseTestPleine).toEqual(casePleine);
    });
  });

  describe('activeBatimentsAdjacents', () => {
    beforeEach(() => {
      component.carte[3][3] = { x: 3, y: 3, content: { batiment: epicerie, indexJ: 'J0', proprietaire: 'O9ex7MQ6J3T5MA5s1H0flqbLnmk1', type: 'batiment', } };
    });
    it('should return an array of the near buildings coordinates', () => {
      component.activeBatimentsAdjacents(component.carte[2][3]);
      expect(carteService.getBatimentsActionnables()).toEqual(['3,3', '3,4']);
    });

    it('should return an empty array', () => {
      component.activeBatimentsAdjacents(component.carte[1][3]);
      expect(carteService.getBatimentsActionnables()).toEqual([]);
    });
  });

  describe('getCasesAdjacentes', () => {
    it('should return 8 coordinates of adjacent cells', () => {
      expect(component.getCasesAdjacentes(3, 3)).toEqual(['2,2', '2,3', '2,4', '3,2', '3,4', '4,2', '4,3', '4,4']);
    });

    it('should return 5 coordinates of adjacent cells', () => {
      expect(component.getCasesAdjacentes(8, 2)).toEqual(['1,7', '1,8', '2,7', '3,7', '3,8']);
    });

    it('should return 3 coordinates of adjacent cells', () => {
      expect(component.getCasesAdjacentes(0, 5)).toEqual(['4,0', '4,1', '5,1']);
    });
  });

  describe('getRessourcesAdjacentes', () => {
    it('should return 2 fishes and 1 wood', () => {
      expect(component.getRessourcesAdjacentes(5, 4)).toEqual({pierre: 0, poisson: 2, bois: 1});
    });
    it('should return 1 fish, 1 stone and 1 wood', () => {
      expect(component.getRessourcesAdjacentes(1, 1)).toEqual({pierre: 1, poisson: 1, bois: 1});
    });
    it('should return no ressources', () => {
      expect(component.getRessourcesAdjacentes(2, 2)).toEqual({pierre: 0, poisson: 0, bois: 0});
    });
  });

  describe('isActionnable', () => {
    it('should be actionnable when the building is in the batimentsActionnables array and it\'s the player turn', () => {
      expect(component.isActionnable(caseEpicerie)).toBeTrue();
    });

    it('should not be actionnable when the building is not in the batimentsActionnables array', () => {
      carteService.batimentsActionnables = [];
      expect(component.isActionnable(caseEpicerie)).toBeFalse();
    });

    it('should not be actionnable when it\s not the player turn', () => {
      component.monTour = false;
      expect(component.isActionnable(caseEpicerie)).toBeFalse();
    });
  });
});
