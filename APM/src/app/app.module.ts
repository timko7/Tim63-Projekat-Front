import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PacijentServces } from './pacijent/pacijent.services';
 

import { AppComponent } from './app.component';
import {PacijentComponent} from  './pacijent/pacijent-component';
import { AppRoutingModule } from './pacijent/app-routing.module';
import { HomeComponent } from './pacijent/home-component';
import { RouterModule } from '@angular/router';
import { KlinikaComponent } from './klinika/klinika-component';
import { KlinikaServices } from './klinika/klinika.services';
import { LekarComponent } from './lekar/lekar-components';
import { LekarServces } from './lekar/lekar.services';
import { ProfilAdminaKlinikeModule } from './profil-admina-klinike/profil-admina-klinike.module';

@NgModule({
  declarations: [
    AppComponent,
    PacijentComponent,
    KlinikaComponent,
    LekarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule,
    ProfilAdminaKlinikeModule,
    RouterModule.forRoot([
      { path: 'signup', component: PacijentComponent },
      { path: 'napraviKliniku', component: KlinikaComponent },
      { path: 'dodajLekara', component: LekarComponent },
      { path: 'homePage', component: HomeComponent }

    ]),
    FormsModule
  ],
  providers:[PacijentServces, KlinikaServices, LekarServces],
  bootstrap: [AppComponent]
})
export class AppModule { }
