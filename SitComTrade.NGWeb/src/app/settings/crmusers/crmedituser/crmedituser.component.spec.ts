import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmedituserComponent } from './crmedituser.component';

describe('CrmedituserComponent', () => {
  let component: CrmedituserComponent;
  let fixture: ComponentFixture<CrmedituserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmedituserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmedituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
