import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsPartieComponent } from './actions-partie.component';

describe('ActionsPartieComponent', () => {
  let component: ActionsPartieComponent;
  let fixture: ComponentFixture<ActionsPartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsPartieComponent ]
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
});
