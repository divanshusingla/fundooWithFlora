import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteMainComponent } from './note-main.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NoteMainComponent', () => {
  let component: NoteMainComponent;
  let fixture: ComponentFixture<NoteMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ NoteMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
