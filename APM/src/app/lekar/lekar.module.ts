import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfilKlinikeComponent } from '../profilKlinike/profil-klinike.component';
import { FormsModule } from '@angular/forms';
import { LekarComponent } from '../lekar/lekar-components';
import { LekarServces } from '../lekar/lekar.services';
import { HomePageLekarComponent } from './home-page-lekar-component';
import { ProfilLekaraComponent } from './profil-lekara.component';
import { PacijentiKlinikeComponent } from './pacijenti-klinike.component';
import { LoginServces } from '../login/login.services';
import { RadniKalendarComponent } from './radniKalendar/radni-kalendar.component';
import { GodOdmorOdsustvoComponent } from './godOdmorOdsustvo/god-odmor-odsustvo.component';
import { ZapocinjanjePregledaIUnosInfComponent } from './zapocinjanjePregledaIUnosInf/zapocinjanje-pregleda-iunos-inf.component';
import { ZakazivanjePregledaOperacijaComponent } from './zakazivanjePregledaOperacija/zakazivanje-pregleda-operacija.component';




@NgModule({
  declarations: [

    HomePageLekarComponent,
    ProfilLekaraComponent,
    PacijentiKlinikeComponent,
    RadniKalendarComponent,
    GodOdmorOdsustvoComponent,
    ZapocinjanjePregledaIUnosInfComponent,
    ZakazivanjePregledaOperacijaComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'lekar', component: HomePageLekarComponent },
      { path: 'lekar/pacijentiKlinike', component: PacijentiKlinikeComponent },
      { path: 'lekar/profilLekara', component: ProfilLekaraComponent },
      { path: 'lekar/radniKalendar', component: RadniKalendarComponent },
      { path: 'lekar/godisnjiOdmorOdsustvo', component: GodOdmorOdsustvoComponent },
      { path: 'lekar/zapocinjanjePregledaIUnosInf', component: ZapocinjanjePregledaIUnosInfComponent },
      { path: 'lekar/zakazivanjePregledaOperacija', component: ZakazivanjePregledaOperacijaComponent },
    ]),
    FormsModule
  ],
  providers: [

    LekarServces,LoginServces
    
  ]
})
export class ProfilLekaraKlinikeModule { }