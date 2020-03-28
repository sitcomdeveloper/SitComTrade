import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmusersComponent } from './crmusers.component';

describe('CrmusersComponent', () => {
  let component: CrmusersComponent;
  let fixture: ComponentFixture<CrmusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
