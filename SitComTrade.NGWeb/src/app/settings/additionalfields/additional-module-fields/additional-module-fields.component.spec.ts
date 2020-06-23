import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalModuleFieldsComponent } from './additional-module-fields.component';

describe('AdditionalModuleFieldsComponent', () => {
  let component: AdditionalModuleFieldsComponent;
  let fixture: ComponentFixture<AdditionalModuleFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalModuleFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalModuleFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
