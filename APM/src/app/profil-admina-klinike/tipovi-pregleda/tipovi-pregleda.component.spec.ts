import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoviPregledaComponent } from './tipovi-pregleda.component';

describe('TipoviPregledaComponent', () => {
  let component: TipoviPregledaComponent;
  let fixture: ComponentFixture<TipoviPregledaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoviPregledaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoviPregledaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
