import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulefieldsComponent } from './modulefields.component';

describe('ModulefieldsComponent', () => {
  let component: ModulefieldsComponent;
  let fixture: ComponentFixture<ModulefieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulefieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulefieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
