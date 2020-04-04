import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegHisComponent } from './reg-his.component';

describe('RegHisComponent', () => {
  let component: RegHisComponent;
  let fixture: ComponentFixture<RegHisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegHisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegHisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
