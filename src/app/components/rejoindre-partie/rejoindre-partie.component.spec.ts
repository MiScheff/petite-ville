import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejoindrePartieComponent } from './rejoindre-partie.component';

describe('RejoindrePartieComponent', () => {
  let component: RejoindrePartieComponent;
  let fixture: ComponentFixture<RejoindrePartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejoindrePartieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejoindrePartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
