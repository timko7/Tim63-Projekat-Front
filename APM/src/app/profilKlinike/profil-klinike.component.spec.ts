import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKlinikeComponent } from './profil-klinike.component';

describe('ProfilKlinikeComponent', () => {
  let component: ProfilKlinikeComponent;
  let fixture: ComponentFixture<ProfilKlinikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilKlinikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilKlinikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
