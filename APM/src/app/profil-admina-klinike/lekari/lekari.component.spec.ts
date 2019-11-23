import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LekariComponent } from './lekari.component';

describe('LekariComponent', () => {
  let component: LekariComponent;
  let fixture: ComponentFixture<LekariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LekariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LekariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
