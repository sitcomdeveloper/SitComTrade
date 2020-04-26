import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAccountsComponent } from './trade-accounts.component';

describe('TradeAccountsComponent', () => {
  let component: TradeAccountsComponent;
  let fixture: ComponentFixture<TradeAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
