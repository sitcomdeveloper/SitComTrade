import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedtransactionComponent } from './rejectedtransaction.component';

describe('RejectedtransactionComponent', () => {
  let component: RejectedtransactionComponent;
  let fixture: ComponentFixture<RejectedtransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedtransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
