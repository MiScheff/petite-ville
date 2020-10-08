import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatimentsComponent } from './batiments.component';

describe('BatimentsComponent', () => {
  let component: BatimentsComponent;
  let fixture: ComponentFixture<BatimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatimentsComponent ]
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
});
