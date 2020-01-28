import {Component, OnInit} from '@angular/core';
import{Pacijent} from '../pacijent/pacijent';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { LoginServces } from '../login/login.services';
import { zakazaniPregled } from '../home-page-pacijenta/zakazaniPregled';
import { ZakazaniPregledService } from '../home-page-pacijenta/zakazaniPregled.services';
import { Korisnik } from '../login/Korisnik';
import { VirtualTimeScheduler } from 'rxjs';
import { Pregled } from '../profil-admina-klinike/pregledi/pregled';
import { PacijentServces } from '../pacijent/pacijent.services';


@Component({

    templateUrl : './zapocet-pregled.html'

})

export class ZapocetPregledComponent implements OnInit{

    data:any;
    pregled:Pregled;
    pacijent:Pacijent;
    pregledan:boolean=false;
    ponovoPregled:boolean=false;
    zahtev:zakazaniPregled;
    _izabraniDatum:Date;

    
        
    constructor(private route: ActivatedRoute, private router: Router,private pacijentService:PacijentServces,private zakazaniPreglediService:ZakazaniPregledService){
        this.route.queryParams.subscribe(params => {
            if (params && params.special) {
              this.data = JSON.parse(params.special);
            }
          });

          this.zahtev=new zakazaniPregled();
        }
        
       
   

    ngOnInit(): void {
        this.pregled=this.data;
     console.log(this.pregled);
     this.pacijentService.vratiKorisnika(this.pregled.idPacijenta).subscribe({
         next:pacijent=>{this.pacijent=pacijent}
     })
    }
     get izabraniDatum():Date{
        return this._izabraniDatum;
      }
    
      set izabraniDatum(value:Date){
        this._izabraniDatum=value;
       
      }

    zavrsiPregled(){
         this.pregledan=true;
          //  this.pregledService.promeniOdradjen(pregled).subscribe(result=>alert("Pregled odradjen"),
       // err=>this.odgovor=true);
    }
    zakaziNovi(){
        this.ponovoPregled=true;

    }
   
    kreirajZahtev(){
        this.zahtev.idLekara=this.pregled.idLekara;
        this.zahtev.idPacijenta=this.pregled.idPacijenta;
        this.zahtev.idKlinike=this.pregled.idKlinike;
        this.zahtev.idTipa=this.pregled.idTipa;
        this.zahtev.cena=this.pregled.cena;
        this.zahtev.datumVreme=this.izabraniDatum;
        this.zakazaniPreglediService.save(this.zahtev).subscribe();
      
    }

   
  
    
  
    }