import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePagePacijentComponent } from './home-page-pacijent-component';
import { HomeComponent } from '../pacijent/home-component';
import { ListaKlinikaComponent } from './lista-klinika-component';
import { LoginServces } from '../login/login.services';
import { FormsModule } from '@angular/forms';
import { KlinikaServices } from '../klinika/klinika.services';
import { LekarServces } from '../lekar/lekar.services';
import { ZakazaniPregledService } from './zakazaniPregled.services';
import { OceniComponent } from './oceni-lekara-kliniku.component';
import { ListaPregledaComponent } from './lista-pregleda-component';




@NgModule({
  declarations: [
    HomePagePacijentComponent,
    ListaKlinikaComponent,
    HomeComponent,
    OceniComponent,
    ListaPregledaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'homePagePacijent', component: HomePagePacijentComponent },
      { path: 'homePagePacijent/listaKlinika', component: ListaKlinikaComponent },
      { path: 'homePagePacijent/homePage', component: HomeComponent },
      { path: 'homePagePacijent/oceni', component: OceniComponent },
      { path: 'homePagePacijent/pregledi', component: ListaPregledaComponent },

    ]),
    FormsModule, 
  ],
  providers: [
      LoginServces,KlinikaServices,LekarServces,ZakazaniPregledService
  ]
})
export class HomePagePacijentaModule { }
