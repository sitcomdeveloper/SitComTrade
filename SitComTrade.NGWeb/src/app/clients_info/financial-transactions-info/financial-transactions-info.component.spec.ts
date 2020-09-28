import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialTransactionsInfoComponent } from './financial-transactions-info.component';

describe('FinancialTransactionsInfoComponent', () => {
  let component: FinancialTransactionsInfoComponent;
  let fixture: ComponentFixture<FinancialTransactionsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialTransactionsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialTransactionsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
