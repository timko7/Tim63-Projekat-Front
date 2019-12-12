import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreglediComponent } from './pregledi.component';

describe('PreglediComponent', () => {
  let component: PreglediComponent;
  let fixture: ComponentFixture<PreglediComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreglediComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreglediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
