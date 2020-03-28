import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingjournalsComponent } from './tradingjournals.component';

describe('TradingjournalsComponent', () => {
  let component: TradingjournalsComponent;
  let fixture: ComponentFixture<TradingjournalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingjournalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingjournalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
