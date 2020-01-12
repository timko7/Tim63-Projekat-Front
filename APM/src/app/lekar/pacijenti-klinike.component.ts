import {Component, OnInit} from '@angular/core';
import{Pacijent} from '../pacijent/pacijent';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServces } from '../login/login.services';
import { zakazaniPregled } from '../home-page-pacijenta/zakazaniPregled';
import { ZakazaniPregledService } from '../home-page-pacijenta/zakazaniPregled.services';
import { Korisnik } from '../login/Korisnik';
import { VirtualTimeScheduler } from 'rxjs';
import { PacijentServces } from '../pacijent/pacijent.services';


@Component({

    templateUrl : './pacijenti-klinike.html'

})

export class PacijentiKlinikeComponent implements OnInit{

    zakazaniPregledi:zakazaniPregled[]=[];
    filtriraniPacijenti:Pacijent[]=[];

    korisnik:Korisnik;
    request:Request;
    pacijentiZaPregled:Pacijent[]=[];
    pom:zakazaniPregled[]=[];
    pomZaPacijente:Pacijent[]=[];
    index:number=0;
    index1:number=0;
    listaId:number[]=[];

    _imePacijenta:string;
    _prezimePacijenta:string;
    _brojPacijenta:string;
    _jedinstveniBroj:string;

    dugmeZaPretragu:boolean=false;
    dodatBroj:boolean=false;
    pomPacijent:Pacijent;
        
    constructor(private route:ActivatedRoute,private router:Router,private paciejentService:PacijentServces,private zkaraniPregledService:ZakazaniPregledService,
        private loginService:LoginServces ){
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
            this.zkaraniPregledService.nadjiPoLekaru(korisnik.id).subscribe({
                next: pregledi=>{this.zakazaniPregledi=pregledi;
                

                    for(let pregled of this.zakazaniPregledi){
                        this.paciejentService.vratiKorisnika(pregled.idPacijenta).subscribe({
                            next: pacijent=>{this.pacijentiZaPregled.push(pacijent);}
                        });
                    }
                }
            });
        }
          });
          this.index=this.zakazaniPregledi.length;
          this.filtriraniPacijenti=this.pacijentiZaPregled;
          console.log(this.pacijentiZaPregled);
    }
   

    zapocniPregled(pregled:zakazaniPregled){
        pregled.odradjen=true;
        this.zkaraniPregledService.promeniOdradjen(pregled).subscribe();
    }

   /* nadjiPregled(pacijent:Pacijent){
        this.zkaraniPregledService.nadjiPoPacijentu(pacijent.id).subscribe({
            next:pregled=>{this.pomPregled=pregled;}
        });

}*/
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
  
    }