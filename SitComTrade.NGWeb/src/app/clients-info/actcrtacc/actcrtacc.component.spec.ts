import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActcrtaccComponent } from './actcrtacc.component';

describe('ActcrtaccComponent', () => {
  let component: ActcrtaccComponent;
  let fixture: ComponentFixture<ActcrtaccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActcrtaccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActcrtaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
