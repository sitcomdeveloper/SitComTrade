import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCasesComponent } from './info-cases.component';

describe('InfoCasesComponent', () => {
  let component: InfoCasesComponent;
  let fixture: ComponentFixture<InfoCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
