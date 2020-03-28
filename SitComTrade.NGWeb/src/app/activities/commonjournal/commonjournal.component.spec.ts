import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonjournalComponent } from './commonjournal.component';

describe('CommonjournalComponent', () => {
  let component: CommonjournalComponent;
  let fixture: ComponentFixture<CommonjournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonjournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonjournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
