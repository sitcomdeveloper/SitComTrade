import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradinghoursComponent } from './tradinghours.component';

describe('TradinghoursComponent', () => {
  let component: TradinghoursComponent;
  let fixture: ComponentFixture<TradinghoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradinghoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradinghoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
