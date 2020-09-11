import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefinancilatransactionsComponent } from './createfinancilatransactions.component';

describe('CreatefinancilatransactionsComponent', () => {
  let component: CreatefinancilatransactionsComponent;
  let fixture: ComponentFixture<CreatefinancilatransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefinancilatransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefinancilatransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
