import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OoinfoComponent } from './ooinfo.component';

describe('OoinfoComponent', () => {
  let component: OoinfoComponent;
  let fixture: ComponentFixture<OoinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OoinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OoinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
