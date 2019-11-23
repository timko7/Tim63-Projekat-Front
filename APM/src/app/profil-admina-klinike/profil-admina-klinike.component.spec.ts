import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAdminaKlinikeComponent } from './profil-admina-klinike.component';

describe('ProfilAdminaKlinikeComponent', () => {
  let component: ProfilAdminaKlinikeComponent;
  let fixture: ComponentFixture<ProfilAdminaKlinikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilAdminaKlinikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilAdminaKlinikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
