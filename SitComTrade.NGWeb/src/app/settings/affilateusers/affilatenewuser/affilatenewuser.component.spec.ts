import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilatenewuserComponent } from './affilatenewuser.component';

describe('AffilatenewuserComponent', () => {
  let component: AffilatenewuserComponent;
  let fixture: ComponentFixture<AffilatenewuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffilatenewuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffilatenewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
