import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedordersComponent } from './openedorders.component';

describe('OpenedordersComponent', () => {
  let component: OpenedordersComponent;
  let fixture: ComponentFixture<OpenedordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenedordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenedordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
