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
import { LoginComponent } from './login/login.component';
import { LoginServces } from './login/login.services';
import { HomePagePacijentaModule } from './home-page-pacijenta/home-page-pacijenta.module';

import { ProfilLekaraKlinikeModule } from './lekar/lekar.module';

import { WelcomeComponent } from './home_klinCentra/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    PacijentComponent,
    KlinikaComponent,
    LoginComponent,
    WelcomeComponent
    //HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule,
    ProfilAdminaKlinikeModule,
    HomePagePacijentaModule,
    ProfilLekaraKlinikeModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'signup', component: PacijentComponent },
      // { path: 'napraviKliniku', component: KlinikaComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
     // { path: 'homePage', component: HomeComponent }

    ]),
    FormsModule
  ],
  providers:[PacijentServces, KlinikaServices,LoginServces],
  bootstrap: [AppComponent]
})
export class AppModule { }
