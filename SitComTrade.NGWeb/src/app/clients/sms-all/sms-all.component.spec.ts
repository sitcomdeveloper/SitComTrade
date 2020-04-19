import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsAllComponent } from './sms-all.component';

describe('SmsAllComponent', () => {
  let component: SmsAllComponent;
  let fixture: ComponentFixture<SmsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
