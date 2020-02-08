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
import { PreglediService } from '../profil-admina-klinike/pregledi/pregledi.service';
import { PregledOdZahtevaServices } from '../profil-admina-klinike/lista-zahteva/pregled-od-zahteva.service';


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
    _trajanjePregleda:number;
    postojiTrajanje:boolean=false;

    
        
    constructor(private route: ActivatedRoute, private router: Router,private pacijentService:PacijentServces,private zakazaniPreglediService:ZakazaniPregledService,
      private pregledService:PreglediService,private preglediOdZahtevaService:PregledOdZahtevaServices){
        this.route.queryParams.subscribe(params => {
            if (params && params.special) {
              this.data = JSON.parse(params.special);
            }
          });

          this.zahtev=new zakazaniPregled();
        }
        
       
   

    ngOnInit(): void {
        this.pregled=this.data;
        
        if(this.pregled.trajanjePregleda!=0){
          this.postojiTrajanje=true;
        }
       
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

      get trajanjePregleda():number{
        return this._trajanjePregleda;
      }
    
      set trajanjePregleda(value:number){
        this._trajanjePregleda=value;
       
      }

    zavrsiPregled(){
      
      if(this.postojiTrajanje==true){
      this.pregledan=true;
      this.pregledService.promeniOdradjen(this.pregled).subscribe(result=>alert("Pregled odradjen"));
    }
    else{
      this.pregled.trajanjePregleda=this.trajanjePregleda;
      this.pregled.odradjen=true;
      this.preglediOdZahtevaService.promeniOdradjen(this.pregled).subscribe(result=>alert("Pregled zavrsen"));
      this.trajanjePregleda=null;
      this.pregledan=true;
    }
              }//,
       // err=>this.odgovor=true);

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
        this.zakazaniPreglediService.save(this.zahtev).subscribe({
          error: error => alert('Neuspesno dodavanje zahteva za pregled. ')
        });
      
    }

   
  
    
  
    }