import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnathorizedPage } from './unathorized.page';

describe('UnathorizedPage', () => {
  let component: UnathorizedPage;
  let fixture: ComponentFixture<UnathorizedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnathorizedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnathorizedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
