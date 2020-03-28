import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtemplatesComponent } from './emailtemplates.component';

describe('EmailtemplatesComponent', () => {
  let component: EmailtemplatesComponent;
  let fixture: ComponentFixture<EmailtemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
