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




@NgModule({
  declarations: [

    HomePageLekarComponent,
    ProfilLekaraComponent,
    PacijentiKlinikeComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'lekar', component: HomePageLekarComponent },
      { path: 'lekar/pacijentiKlinike', component: PacijentiKlinikeComponent },
      { path: 'lekar/profilLekara', component: ProfilLekaraComponent },
    ]),
    FormsModule
  ],
  providers: [

    LekarServces,LoginServces
    
  ]
})
export class ProfilLekaraKlinikeModule { }