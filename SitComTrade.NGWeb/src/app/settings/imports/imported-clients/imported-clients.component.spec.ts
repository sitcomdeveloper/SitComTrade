import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedClientsComponent } from './imported-clients.component';

describe('ImportedClientsComponent', () => {
  let component: ImportedClientsComponent;
  let fixture: ComponentFixture<ImportedClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportedClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
