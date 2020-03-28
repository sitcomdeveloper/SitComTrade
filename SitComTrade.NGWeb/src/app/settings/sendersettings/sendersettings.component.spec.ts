import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendersettingsComponent } from './sendersettings.component';

describe('SendersettingsComponent', () => {
  let component: SendersettingsComponent;
  let fixture: ComponentFixture<SendersettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendersettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendersettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
