import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanormaIconComponent } from './panorma-icon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PanormaIconComponent', () => {
  let component: PanormaIconComponent;
  let fixture: ComponentFixture<PanormaIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ PanormaIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanormaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
