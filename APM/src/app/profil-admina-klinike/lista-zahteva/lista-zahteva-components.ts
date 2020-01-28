import { Component, OnInit } from '@angular/core';
import { ITipPregleda } from '../tipovi-pregleda/tip-pregleda';
import { Sala } from '../sale/sala';
import { Lekar } from 'src/app/lekar/lekar';
import { TipoviService } from '../tipovi-pregleda/tipovi-pregleda.service';
import { SalaServices } from '../sale/sala.services';
import { LekarServces } from 'src/app/lekar/lekar.services';
import { AdminKlinikeService } from '../profil-amina-klinike.services';
import { IAdminKlinike } from '../admin-klinike';
import { Router } from '@angular/router';
import { ZakazaniPregledService } from 'src/app/home-page-pacijenta/zakazaniPregled.services';
import { zakazaniPregled } from 'src/app/home-page-pacijenta/zakazaniPregled';

@Component({
  templateUrl: './lista-zahteva.html',

})
export class ListaZahtevaComponent implements OnInit {

  zahtevi:zakazaniPregled[]=[];


  constructor(private _router:Router, private adminKlinikeService: AdminKlinikeService, private lekarService: LekarServces
    ,private zakazaniPreglediService:ZakazaniPregledService) { 
    
  }

  ngOnInit() {

    this.adminKlinikeService.getAdminKlinike().subscribe({
        next:admin=>{
            this.zakazaniPreglediService.nadjiPoKlinici(admin.idKlinike).subscribe({
                next:zahtevi=>{this.zahtevi=zahtevi;}
            })
        }
    })
    
  }
  odobriZahtev(zahtev:zakazaniPregled){

  }


 
  
  

}