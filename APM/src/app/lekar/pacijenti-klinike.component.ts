import {Component, OnInit} from '@angular/core';
import{Pacijent} from '../pacijent/pacijent';
import { ActivatedRoute, Router, NavigationExtras, Data } from '@angular/router';
import { LoginServces } from '../login/login.services';
import { zakazaniPregled } from '../home-page-pacijenta/zakazaniPregled';
import { ZakazaniPregledService } from '../home-page-pacijenta/zakazaniPregled.services';
import { Korisnik } from '../login/Korisnik';
import { VirtualTimeScheduler } from 'rxjs';
import { PacijentServces } from '../pacijent/pacijent.services';
import { PreglediService } from '../profil-admina-klinike/pregledi/pregledi.service';
import { Pregled } from '../profil-admina-klinike/pregledi/pregled';
import { ZapocetPregledComponent } from './zapocet-pregled-component';
import { PregledOdZahtevaServices } from '../profil-admina-klinike/lista-zahteva/pregled-od-zahteva.service';
import { PregledOdZahteva } from '../profil-admina-klinike/lista-zahteva/pregled-od-zahteva';


@Component({

    templateUrl : './pacijenti-klinike.html'

})

export class PacijentiKlinikeComponent implements OnInit{

    zakazaniPregledi:Pregled[]=[];
    pomPregledi:Pregled[]=[];
    filtriraniPacijenti:Pacijent[]=[];
    zakazaniPreglediOdZahteva:PregledOdZahteva[]=[];

    korisnik:Korisnik;
    request:Request;
    pacijentiZaPregled:Pacijent[]=[];

    pom:Pregled[]=[];
    pomZaPacijente:Pacijent[]=[];
    index:number=0;
    index1:number=0;
    indexOstali:number=0;
    listaId:number[]=[];

    _imePacijenta:string;
    _prezimePacijenta:string;
    _brojPacijenta:string;
    _jedinstveniBroj:string;

    dugmeZaPretragu:boolean=false;
    dodatBroj:boolean=false;
    pomPacijent:Pacijent;
    odgovor:boolean=false;
        
    constructor(private route:ActivatedRoute,private router:Router,private paciejentService:PacijentServces,private pregledService:PreglediService,
        private loginService:LoginServces,private zakazaniPreglediService:ZakazaniPregledService,private pregledOdZahteva:PregledOdZahtevaServices ){
            this.korisnik=new Korisnik();
            this.pomPacijent=new Pacijent();

        
    }   
    get imePacijenta():string{
        return this._imePacijenta;
      }
    
      get prezimePacijenta():string{
        return this._prezimePacijenta;
      }
      get brojPacijenta():string{
        return this._brojPacijenta;
      }
      get jedinstveniBroj():string{
        return this._jedinstveniBroj;
      }
    
      set imePacijenta(value:string){
        this._imePacijenta=value;
      }
    
      set prezimePacijenta(value:string){
        this._prezimePacijenta=value;
      }
      set brojPacijenta(value:string){
        this._brojPacijenta=value;
        this.dodatBroj=true;
      }
      set jedinstveniBroj(value:string){
        this._jedinstveniBroj=value;
        this.filtriraniPacijenti= this.jedinstveniBroj ? this.filtriraj(this.jedinstveniBroj):this.pacijentiZaPregled;
      }

      filtriraj(poljeZaFilter:string):Pacijent[]{
      //  poljeZaFilter=poljeZaFilter.toLowerCase();
        return this.pacijentiZaPregled.filter((pacijent:Pacijent)=>pacijent.broj_osiguranika.indexOf(poljeZaFilter)!=-1);
    
      }

    ngOnInit(): void {
        this.loginService.getKorisnika().subscribe({next: korisnik=>{
            this.pregledService.nadjiPoLekaru(korisnik.id).subscribe({
                next: pregledi=>{
                  this.pomPregledi=pregledi;
                  for(let pregled of this.pomPregledi){
                    if(pregled.rezervisan==true){
                      this.zakazaniPregledi.push(pregled);
                                        }
                  }
                  this.pregledOdZahteva.vratiPoLekaru(korisnik.id).subscribe({
                    next:pregldi=>{
                      this.zakazaniPreglediOdZahteva=pregldi;
                      for(let pregled of this.zakazaniPreglediOdZahteva){
                        this.zakazaniPregledi.push(pregled);
                      }
                      for(let pregled of this.zakazaniPregledi){
                    
                        this.paciejentService.vratiKorisnika(pregled.idPacijenta).subscribe({
                          next: pacijent=>{this.pacijentiZaPregled.push(pacijent);
                          console.log("alooo"+this.pacijentiZaPregled);
                          
                        }
                       });
                        
                        this.index=this.pacijentiZaPregled.length;
                       
                      }
              
                      
                    }
                  });
            // this.pregledOdZahteva.vratiPoLekaru(korisnik.id).subscribe({
            //   next:pregldi=>{this.zakazaniPreglediOdZahteva=pregldi;
            //     for(let pregled of this.zakazaniPreglediOdZahteva){
            //       this.zakazaniPregledi.push(pregled);
            // }

            // for(let pregled of this.zakazaniPregledi){
            //   this.paciejentService.vratiKorisnika(pregled.idPacijenta).subscribe({
            //     next: pacijent=>{this.pacijentiZaPregled.push(pacijent);
            //     console.log("alooo"+this.pacijentiZaPregled);
            //   }
            //  });
            // }
          }
            })     
          }
        });
       
          
      
          this.filtriraniPacijenti=this.pacijentiZaPregled;
          console.log(this.pacijentiZaPregled);
          console.log(this.indexOstali);
          console.log(this.index);
    }
   
    
    zapocniPregled(pregled:Pregled){
        let navigationExtras: NavigationExtras = {
          queryParams: {
            special: JSON.stringify(pregled)
          }
        };
        this.router.navigate(["/lekar/pacijentiKlinike/zapocetPregled"],navigationExtras);
     
    }

  
    kraj(){
        this.router.navigate(["/login"]);
    }

  

      preuzmiZaPretragu(){
          
        this.dugmeZaPretragu=true;
        this.pomZaPacijente=[];
        
        for(let pacijent of this.pacijentiZaPregled){
                if(pacijent.ime == this.imePacijenta || pacijent.prezime==this.prezimePacijenta || pacijent.broj_osiguranika==this.brojPacijenta)
                      this.pomZaPacijente.push(pacijent);
                       this.pacijentiZaPregled=this.pomZaPacijente;
                        this.filtriraniPacijenti=this.pacijentiZaPregled;
                       this.index1=this.pacijentiZaPregled.length;
                    
                     
         
        }
         
          this.imePacijenta="";
          this.prezimePacijenta="";
          this.brojPacijenta=null;
         
      }

  
  vidiProfil(idPacijenta: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(idPacijenta)
      }
    };
    this.router.navigate(["/lekar/pacijentiKlinike/profil/"],navigationExtras);
  }

  onBack(): void {
    this.router.navigate(['/lekar']);
  }


}