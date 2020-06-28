import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstrumentsComponent } from './create-instruments.component';

describe('CreateInstrumentsComponent', () => {
  let component: CreateInstrumentsComponent;
  let fixture: ComponentFixture<CreateInstrumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstrumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstrumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
