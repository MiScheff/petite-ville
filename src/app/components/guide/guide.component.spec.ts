import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { routes } from 'src/app/app.routes';
import { environment } from 'src/environments/environment';

import { GuideComponent } from './guide.component';

describe('GuideComponent', () => {
  let component: GuideComponent;
  let fixture: ComponentFixture<GuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideComponent ],

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
    fixture = TestBed.createComponent(GuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
