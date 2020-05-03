import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsInfoComponent } from './groups-info.component';

describe('GroupsInfoComponent', () => {
  let component: GroupsInfoComponent;
  let fixture: ComponentFixture<GroupsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
