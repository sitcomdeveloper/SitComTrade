import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalfieldsComponent } from './additionalfields.component';

describe('AdditionalfieldsComponent', () => {
  let component: AdditionalfieldsComponent;
  let fixture: ComponentFixture<AdditionalfieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalfieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
