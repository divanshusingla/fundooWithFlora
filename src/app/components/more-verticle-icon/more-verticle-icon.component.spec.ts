import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreVerticleIconComponent } from './more-verticle-icon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

describe('MoreVerticleIconComponent', () => {
  let component: MoreVerticleIconComponent;
  let fixture: ComponentFixture<MoreVerticleIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ MoreVerticleIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreVerticleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
