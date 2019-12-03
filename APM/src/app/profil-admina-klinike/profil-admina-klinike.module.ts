import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfilAdminaKlinikeComponent } from './profil-admina-klinike.component';
import { ProfilKlinikeComponent } from '../profilKlinike/profil-klinike.component';
import { TipoviPregledaComponent } from './tipovi-pregleda/tipovi-pregleda.component';
import { LekariComponent } from './lekari/lekari.component';
import { SaleComponent } from './sale/sale.component';
import { TipoviService } from './tipovi-pregleda/tipovi-pregleda.service';
import { AdminKlinikeService } from './profil-amina-klinike.services';
import { SalaServices } from './sale/sala.services';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfilAdminaKlinikeComponent,
    TipoviPregledaComponent,
    LekariComponent,
    SaleComponent,
    ProfilKlinikeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'adminKlinike', component: ProfilAdminaKlinikeComponent },
      { path: 'adminKlinike/profilKlinike', component: ProfilKlinikeComponent },
      { path: 'adminKlinike/tipoviPregleda', component: TipoviPregledaComponent },
      { path: 'adminKlinike/lekari', component: LekariComponent },
      { path: 'adminKlinike/sale', component: SaleComponent },
    ]),
    FormsModule
  ],
  providers: [
    TipoviService,
    AdminKlinikeService,
    SalaServices
  ]
})
export class ProfilAdminaKlinikeModule { }
