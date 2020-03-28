import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeaccountsComponent } from './tradeaccounts.component';

describe('TradeaccountsComponent', () => {
  let component: TradeaccountsComponent;
  let fixture: ComponentFixture<TradeaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
