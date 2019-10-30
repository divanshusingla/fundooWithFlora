import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnarchiveIconComponent } from './unarchive-icon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UnarchiveIconComponent', () => {
  let component: UnarchiveIconComponent;
  let fixture: ComponentFixture<UnarchiveIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ UnarchiveIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnarchiveIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
