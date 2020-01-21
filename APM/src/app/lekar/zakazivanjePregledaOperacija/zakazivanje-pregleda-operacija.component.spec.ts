import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakazivanjePregledaOperacijaComponent } from './zakazivanje-pregleda-operacija.component';

describe('ZakazivanjePregledaOperacijaComponent', () => {
  let component: ZakazivanjePregledaOperacijaComponent;
  let fixture: ComponentFixture<ZakazivanjePregledaOperacijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakazivanjePregledaOperacijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakazivanjePregledaOperacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
