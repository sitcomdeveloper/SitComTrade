import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprtclntdtaComponent } from './imprtclntdta.component';

describe('ImprtclntdtaComponent', () => {
  let component: ImprtclntdtaComponent;
  let fixture: ComponentFixture<ImprtclntdtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprtclntdtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprtclntdtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
