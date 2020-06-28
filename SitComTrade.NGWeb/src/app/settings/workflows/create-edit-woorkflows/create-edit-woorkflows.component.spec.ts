import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditWoorkflowsComponent } from './create-edit-woorkflows.component';

describe('CreateEditWoorkflowsComponent', () => {
  let component: CreateEditWoorkflowsComponent;
  let fixture: ComponentFixture<CreateEditWoorkflowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditWoorkflowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditWoorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
