import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { routes } from './app.routes';
import { MenuComponent } from './components/menu/menu.component';
import { PartieComponent } from './components/partie/partie.component';
import { CarteComponent } from './components/carte/carte.component';
import { ScoreComponent } from './components/score/score.component';
import { BatimentsComponent } from './components/batiments/batiments.component';
import { JoueursComponent } from './components/joueurs/joueurs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    PartieComponent,
    CarteComponent,
    ScoreComponent,
    BatimentsComponent,
    JoueursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
