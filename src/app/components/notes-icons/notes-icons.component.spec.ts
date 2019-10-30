import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesIconsComponent } from './notes-icons.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NotesIconsComponent', () => {
  let component: NotesIconsComponent;
  let fixture: ComponentFixture<NotesIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ NotesIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
