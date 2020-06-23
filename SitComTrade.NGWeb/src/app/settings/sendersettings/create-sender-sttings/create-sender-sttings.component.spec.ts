import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSenderSttingsComponent } from './create-sender-sttings.component';

describe('CreateSenderSttingsComponent', () => {
  let component: CreateSenderSttingsComponent;
  let fixture: ComponentFixture<CreateSenderSttingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSenderSttingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSenderSttingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
