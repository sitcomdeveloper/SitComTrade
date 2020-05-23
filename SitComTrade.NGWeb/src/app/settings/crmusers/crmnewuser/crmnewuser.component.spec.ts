import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmnewuserComponent } from './crmnewuser.component';

describe('CrmnewuserComponent', () => {
  let component: CrmnewuserComponent;
  let fixture: ComponentFixture<CrmnewuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmnewuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmnewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
