import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajiPoslovanjaComponent } from './izvestaji-poslovanja.component';

describe('IzvestajiPoslovanjaComponent', () => {
  let component: IzvestajiPoslovanjaComponent;
  let fixture: ComponentFixture<IzvestajiPoslovanjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzvestajiPoslovanjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzvestajiPoslovanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
