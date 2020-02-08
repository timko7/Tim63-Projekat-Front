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

    templateUrl : './pacijent-pregledi.html'

})

export class ListaPregledaComponent implements OnInit{

    pregledi:Pregled[]=[];
    preglediOdZahteva:PregledOdZahteva[]=[];
    korisnik:Korisnik;
    request:Request;
    lekari:Lekar[]=[];
    index:number=0;
   
 

    constructor(private route:ActivatedRoute,private router:Router,private lekarService:LekarServces,
        private loginService:LoginServces,private klinikaService:KlinikaServices,private preglediService:PreglediService,
        private pregldediOdZahtevaService:PregledOdZahtevaServices ){
            this.korisnik=new Korisnik();
            

    }   

    ngOnInit(): void {
        this.loginService.getKorisnika().subscribe({next: korisnik=>{
            this.preglediService.nadjiPoPacijentu(korisnik.id).subscribe({
                next: pregledi=>{this.pregledi=pregledi;

            this.pregldediOdZahtevaService.vratiPoPacijentu(korisnik.id).subscribe({
              next:pregldi=>{this.preglediOdZahteva=pregldi;
                for(let pregled of this.preglediOdZahteva){
                  this.pregledi.push(pregled);

                  for(let pregled of this.pregledi){
                    this.lekarService.findLekar(pregled.idLekara).subscribe({
                      next: lekar=>{this.lekari.push(lekar);
                      console.log("alooo"+this.lekari);
                      this.index=this.lekari.length;
                    }
                               
                  });
                }
            }
        }
    });
           
        }
        });
            
               
          }
        });
        
        }
        

    otkaziPregled(pregled:Pregled){
        if(pregled.trajanjePregleda!=0){
            this.preglediService.otkaziPregled(pregled).subscribe(error=>alert("Ne moze se otkzati datum"));
            this.pregledi.splice(this.pregledi.indexOf(pregled),1);
        }
        else{
            this.pregldediOdZahtevaService.otkaziPregled(pregled).subscribe(error=>alert("Ne moze se otkzati datum"));
            this.pregledi.splice(this.pregledi.indexOf(pregled),1);
        }
    }
   

    
   
}