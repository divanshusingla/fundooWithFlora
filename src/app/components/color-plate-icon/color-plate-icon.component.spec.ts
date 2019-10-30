import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPlateIconComponent } from './color-plate-icon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

describe('ColorPlateIconComponent', () => {
  let component: ColorPlateIconComponent;
  let fixture: ComponentFixture<ColorPlateIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ColorPlateIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPlateIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
