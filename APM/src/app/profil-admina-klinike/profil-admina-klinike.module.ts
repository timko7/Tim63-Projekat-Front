import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfilAdminaKlinikeComponent } from './profil-admina-klinike.component';
import { ProfilKlinikeComponent } from '../profilKlinike/profil-klinike.component';
import { TipoviPregledaComponent } from './tipovi-pregleda/tipovi-pregleda.component';
import { SaleComponent } from './sale/sale.component';
import { TipoviService } from './tipovi-pregleda/tipovi-pregleda.service';
import { AdminKlinikeService } from './profil-amina-klinike.services';
import { SalaServices } from './sale/sala.services';
import { FormsModule } from '@angular/forms';
import { LekarComponent } from '../lekar/lekar-components';
import { LekarServces } from '../lekar/lekar.services';
import { PreglediComponent } from './pregledi/pregledi.component';
import { PreglediService } from './pregledi/pregledi.service';

import { ListaZahtevaComponent } from './lista-zahteva/lista-zahteva-components';
import { ZakazaniPregledService } from '../home-page-pacijenta/zakazaniPregled.services';

import { ZahteviZaOdsustvoComponent } from './zahteviZaOdsustvo/zahtevi-za-odsustvo.component';
import { OdobrenjeZahtevaComponent } from './lista-zahteva/odobrenje-zahteva.component';
import { PregledOdZahtevaServices } from './lista-zahteva/pregled-od-zahteva.service';
import { IzvestajiPoslovanjaComponent } from './izvestaji-poslovanja/izvestaji-poslovanja.component';
import { IzvestajiService } from './izvestaji-poslovanja/izvestaji.service';




@NgModule({
  declarations: [
    ProfilAdminaKlinikeComponent,
    TipoviPregledaComponent,
    SaleComponent,
    LekarComponent,
    ProfilKlinikeComponent,
    PreglediComponent,

    ListaZahtevaComponent,

    ZahteviZaOdsustvoComponent,

    OdobrenjeZahtevaComponent,

    IzvestajiPoslovanjaComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'adminKlinike', component: ProfilAdminaKlinikeComponent },
      { path: 'adminKlinike/profilKlinike', component: ProfilKlinikeComponent },
      { path: 'adminKlinike/tipoviPregleda', component: TipoviPregledaComponent },
      { path: 'adminKlinike/lekari', component: LekarComponent },
      { path: 'adminKlinike/sale', component: SaleComponent },
      { path: 'adminKlinike/pregledi', component: PreglediComponent },

      { path: 'adminKlinike/listaZahtevaZaPreglede', component: ListaZahtevaComponent },
      { path: 'adminKlinike/listaZahtevaZaPreglede/odobrenjeZahteva', component: OdobrenjeZahtevaComponent },

      { path: 'adminKlinike/zahteviZaOdsustvo', component: ZahteviZaOdsustvoComponent },

      { path: 'adminKlinike/izvestajiPoslovanjaKlinike', component: IzvestajiPoslovanjaComponent },

    ]),
    FormsModule
  ],
  providers: [
    TipoviService,
    AdminKlinikeService,
    SalaServices,
    LekarServces,
    PreglediService,
    PregledOdZahtevaServices,
    ZakazaniPregledService,
    IzvestajiService,
  ]
})
export class ProfilAdminaKlinikeModule { }
