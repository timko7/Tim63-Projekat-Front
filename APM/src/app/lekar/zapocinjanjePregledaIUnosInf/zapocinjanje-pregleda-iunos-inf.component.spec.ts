import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapocinjanjePregledaIUnosInfComponent } from './zapocinjanje-pregleda-iunos-inf.component';

describe('ZapocinjanjePregledaIUnosInfComponent', () => {
  let component: ZapocinjanjePregledaIUnosInfComponent;
  let fixture: ComponentFixture<ZapocinjanjePregledaIUnosInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZapocinjanjePregledaIUnosInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapocinjanjePregledaIUnosInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
