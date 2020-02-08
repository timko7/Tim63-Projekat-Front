import {Component, OnInit} from '@angular/core';
import{Pacijent} from '../pacijent/pacijent';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServces } from '../login/login.services';
import { zakazaniPregled } from '../home-page-pacijenta/zakazaniPregled';
import { ZakazaniPregledService } from '../home-page-pacijenta/zakazaniPregled.services';
import { Korisnik } from '../login/Korisnik';
import { VirtualTimeScheduler } from 'rxjs';
import { PacijentServces } from '../pacijent/pacijent.services';
import { Lekar } from '../lekar/lekar';
import { Klinika } from '../klinika/klinika';
import { LekarServces } from '../lekar/lekar.services';
import { KlinikaServices } from '../klinika/klinika.services';
import { Ocena } from './ocena';
import { PreglediService } from '../profil-admina-klinike/pregledi/pregledi.service';
import { Pregled } from '../profil-admina-klinike/pregledi/pregled';
import { ThrowStmt } from '@angular/compiler';
import { PregledOdZahtevaServices } from '../profil-admina-klinike/lista-zahteva/pregled-od-zahteva.service';
import { PregledOdZahteva } from '../profil-admina-klinike/lista-zahteva/pregled-od-zahteva';


@Component({

    templateUrl : './oceni.html'

})

export class OceniComponent implements OnInit{

    pregledi:Pregled[]=[];
    preglediOdZahteva:PregledOdZahteva[]=[];
    korisnik:Korisnik;
    request:Request;
    lekari:Lekar[]=[];
    index:number=0;
    klinike:Klinika[]=[];
    ocena:Ocena;
    _ocenaLekara:number;
    _ocenaKlinike:number;
    dugmeOceniLekara:boolean=false;
    dugmeOceniKliniku:boolean=false;
    mozesDodati:boolean=false;

    datumiPregleda:Date[]=[];
    izabraniLekar:Lekar;
    izabranaKlinika:Klinika;
 

    constructor(private route:ActivatedRoute,private router:Router,private lekarService:LekarServces,private zkaraniPregledService:ZakazaniPregledService,
        private loginService:LoginServces,private klinikaService:KlinikaServices,private preglediService:PreglediService,
        private pregldediOdZahtevaService:PregledOdZahtevaServices ){
            this.korisnik=new Korisnik();
            this.ocena=new Ocena();
            this.izabraniLekar=new Lekar();
            this.izabranaKlinika=new Klinika();

    }   

    ngOnInit(): void {
        this.loginService.getKorisnika().subscribe({next: korisnik=>{
            this.preglediService.nadjiPoPacijentu(korisnik.id).subscribe({
                    next:pregledi=>{this.pregledi=pregledi;}
            })
            this.pregldediOdZahtevaService.vratiPoPacijentu(korisnik.id).subscribe({
                next:pregledi=>{this.preglediOdZahteva=pregledi;
                
                for(let pregled of this.preglediOdZahteva){
                    this.pregledi.push(pregled);
                }
                for(let pregled of this.pregledi){
                    if(pregled.odradjen){
                    this.lekarService.findLekar(pregled.idLekara).subscribe({
                        next: lekar=>{this.lekari.push(lekar);}
                    });
            
                    this.klinikaService.vratiKlinikuPoId(pregled.idKlinike).subscribe({
                        next: klinika=>{this.klinike.push(klinika);}
                    });
                    this.datumiPregleda.push(pregled.datumVreme);
                }
            }
        }
        })  
                        
                           
                
        }
          });
          this.index=this.datumiPregleda.length;

    }

    get ocenaLekara():number{
        return this._ocenaLekara;
      }
      get ocenaKlinike():number{
        return this._ocenaKlinike;
      }

      set ocenaLekara(value:number){
        this._ocenaLekara=value;
      }
      set ocenaKlinike(value:number){
        this._ocenaKlinike=value;
      }

    oceni(lekar:Lekar){
        this.dugmeOceniLekara=true;
        this.izabraniLekar=lekar;
    }
 oceniLekara(){
    if(this.ocenaLekara<1){
        alert("Ne moze se uneti negativna ocena");
        this.mozesDodati=false;
    }
   else if(this.ocenaLekara>5){
        alert("Ne moze se uneti ocena veca od 5");
        this.mozesDodati=false;
    }
    else{
        this.mozesDodati=true;
    }if(this.mozesDodati==true){
    this.ocena.idLekara=this.izabraniLekar.id;
    this.ocena.ocena=this.ocenaLekara;
    this.lekarService.oceniLekara(this.ocena).subscribe();
    this.ocenaLekara=null;
    this.dugmeOceniLekara=false;}

}
    oceniKliniku(k:Klinika){
       this.dugmeOceniKliniku=true;
       this.izabranaKlinika=k;
        
    }
    posaljiOcenuKlinike(){
       
        if(this.ocenaKlinike<1){
            alert("Ne moze se uneti negativna ocena");
            this.mozesDodati=false;
        }
       else if(this.ocenaKlinike>5){
            alert("Ne moze se uneti ocena veca od 5");
            this.mozesDodati=false;
        }
        else{
            this.mozesDodati=true;
        }
        if(this.mozesDodati==true){
        this.ocena.idKlinike=this.izabranaKlinika.id;
        this.ocena.ocena=this.ocenaKlinike;
        this.klinikaService.oceniKliniku(this.ocena).subscribe();
        this.ocenaKlinike=null;
        this.dugmeOceniKliniku=false;
        }
    
    }

    
    kraj(){
        this.router.navigate(["/login"]);
    }
    
}