import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementsComponent } from './evenements.component';

describe('EvenementsComponent', () => {
  let component: EvenementsComponent;
  let fixture: ComponentFixture<EvenementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
