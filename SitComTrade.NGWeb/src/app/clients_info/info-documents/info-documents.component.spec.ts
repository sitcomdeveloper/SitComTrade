import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDocumentsComponent } from './info-documents.component';

describe('InfoDocumentsComponent', () => {
  let component: InfoDocumentsComponent;
  let fixture: ComponentFixture<InfoDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
