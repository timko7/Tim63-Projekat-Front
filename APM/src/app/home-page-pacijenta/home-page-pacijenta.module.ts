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




@NgModule({
  declarations: [
    HomePagePacijentComponent,
    ListaKlinikaComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'homePagePacijent', component: HomePagePacijentComponent },
      { path: 'homePagePacijent/listaKlinika', component: ListaKlinikaComponent },
      { path: 'homePagePacijent/homePage', component: HomeComponent },

    ]),
    FormsModule, 
  ],
  providers: [
      LoginServces,KlinikaServices,LekarServces
  ]
})
export class HomePagePacijentaModule { }
