import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderIconComponent } from './reminder-icon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ReminderIconComponent', () => {
  let component: ReminderIconComponent;
  let fixture: ComponentFixture<ReminderIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ReminderIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
