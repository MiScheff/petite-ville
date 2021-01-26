import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BatimentsComponent } from './components/batiments/batiments.component';
import { CarteComponent } from './components/carte/carte.component';
import { HomeComponent } from './components/home/home.component';
import { JoueursComponent } from './components/joueurs/joueurs.component';
import { MenuComponent } from './components/menu/menu.component';
import { PartieComponent } from './components/partie/partie.component';
import { AuthService } from './services/auth.service';
import { BatimentsService } from './services/batiments.service';
import { CartesService } from './services/cartes.service';
import { PartiesService } from './services/parties.service';
import { RejoindrePartieComponent } from './components/rejoindre-partie/rejoindre-partie.component';
import { ActionsPartieComponent } from './components/actions-partie/actions-partie.component';
import { UsersService } from './services/users.service';
import { JoueursService } from './services/joueurs.service';
import { EvenementsComponent } from './components/evenements/evenements.component';
import { InitService } from './services/init.service';
import { EvenementsService } from './services/evenements.service';
import { NotifierModule } from 'angular-notifier';
import { GuideComponent } from './components/guide/guide.component';

@NgModule({
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
