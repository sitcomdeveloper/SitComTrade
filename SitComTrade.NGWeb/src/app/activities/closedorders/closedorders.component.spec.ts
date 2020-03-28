import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedordersComponent } from './closedorders.component';

describe('ClosedordersComponent', () => {
  let component: ClosedordersComponent;
  let fixture: ComponentFixture<ClosedordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
