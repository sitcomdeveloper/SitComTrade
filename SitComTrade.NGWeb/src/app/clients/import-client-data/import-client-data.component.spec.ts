import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportClientDataComponent } from './import-client-data.component';

describe('ImportClientDataComponent', () => {
  let component: ImportClientDataComponent;
  let fixture: ComponentFixture<ImportClientDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportClientDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportClientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
