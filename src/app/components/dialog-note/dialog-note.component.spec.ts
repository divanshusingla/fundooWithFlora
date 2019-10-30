import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogNoteComponent } from './dialog-note.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppMaterialModule} from '../../angularMaterial/angular.material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('DialogNoteComponent', () => {
  let component: DialogNoteComponent;
  let fixture: ComponentFixture<DialogNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {} // Add any data you wish to test if it is passed/used correctly
      }],
      imports: [AppMaterialModule, FormsModule,ReactiveFormsModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ DialogNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
