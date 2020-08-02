import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivepopupsComponent } from './livepopups.component';

describe('LivepopupsComponent', () => {
  let component: LivepopupsComponent;
  let fixture: ComponentFixture<LivepopupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivepopupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivepopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
