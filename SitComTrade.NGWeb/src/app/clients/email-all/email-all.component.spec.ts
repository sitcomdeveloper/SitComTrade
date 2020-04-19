import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAllComponent } from './email-all.component';

describe('EmailAllComponent', () => {
  let component: EmailAllComponent;
  let fixture: ComponentFixture<EmailAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
