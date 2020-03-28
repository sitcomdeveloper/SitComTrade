import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetarytransactionsComponent } from './monetarytransactions.component';

describe('MonetarytransactionsComponent', () => {
  let component: MonetarytransactionsComponent;
  let fixture: ComponentFixture<MonetarytransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonetarytransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonetarytransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
