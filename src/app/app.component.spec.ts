import { TestBed, async } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NotifierModule } from 'angular-notifier';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ActionsPartieComponent } from './components/actions-partie/actions-partie.component';
import { BatimentsComponent } from './components/batiments/batiments.component';
import { CarteComponent } from './components/carte/carte.component';
import { EvenementsComponent } from './components/evenements/evenements.component';
import { GuideComponent } from './components/guide/guide.component';
import { HomeComponent } from './components/home/home.component';
import { JoueursComponent } from './components/joueurs/joueurs.component';
import { MenuComponent } from './components/menu/menu.component';
import { PartieComponent } from './components/partie/partie.component';
import { RejoindrePartieComponent } from './components/rejoindre-partie/rejoindre-partie.component';
import { AuthService } from './services/auth.service';
import { BatimentsService } from './services/batiments.service';
import { CartesService } from './services/cartes.service';
import { EvenementsService } from './services/evenements.service';
import { InitService } from './services/init.service';
import { JoueursService } from './services/joueurs.service';
import { PartiesService } from './services/parties.service';
import { UsersService } from './services/users.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          HomeComponent,
          MenuComponent,
          PartieComponent,
          CarteComponent,
          BatimentsComponent,
          JoueursComponent,
          RejoindrePartieComponent,
          ActionsPartieComponent,
          EvenementsComponent,
          GuideComponent,
        ],
        imports: [
          BrowserModule,
          AppRoutingModule,
          AngularFireModule.initializeApp(environment.firebase),
          AngularFireDatabaseModule,
          RouterModule.forRoot(routes),
          NotifierModule
        ],
        providers: [
          InitService,
          PartiesService,
          CartesService,
          BatimentsService,
          EvenementsService,
          JoueursService,
          UsersService,
          AuthService
        ]
      
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'petite-ville'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('petite-ville');
  });
});
