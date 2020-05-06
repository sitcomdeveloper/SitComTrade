import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsFilterComponent } from './translations-filter.component';

describe('TranslationsFilterComponent', () => {
  let component: TranslationsFilterComponent;
  let fixture: ComponentFixture<TranslationsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
