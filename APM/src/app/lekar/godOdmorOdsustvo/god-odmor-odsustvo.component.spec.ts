import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GodOdmorOdsustvoComponent } from './god-odmor-odsustvo.component';

describe('GodOdmorOdsustvoComponent', () => {
  let component: GodOdmorOdsustvoComponent;
  let fixture: ComponentFixture<GodOdmorOdsustvoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GodOdmorOdsustvoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GodOdmorOdsustvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
