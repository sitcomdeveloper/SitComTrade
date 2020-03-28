import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilateusersComponent } from './affilateusers.component';

describe('AffilateusersComponent', () => {
  let component: AffilateusersComponent;
  let fixture: ComponentFixture<AffilateusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffilateusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffilateusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
