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


@Component({

    templateUrl : './oceni.html'

})

export class OceniComponent implements OnInit{

    zakazaniPregledi:zakazaniPregled[]=[];
    korisnik:Korisnik;
    request:Request;
    lekari:Lekar[]=[];
    index:number=0;
    klinike:Klinika[]=[];
        
    constructor(private route:ActivatedRoute,private router:Router,private lekarService:LekarServces,private zkaraniPregledService:ZakazaniPregledService,
        private loginService:LoginServces,private klinikaService:KlinikaServices ){
            this.korisnik=new Korisnik();
        
    }   

    ngOnInit(): void {
        this.loginService.getKorisnika().subscribe({next: korisnik=>{
            this.zkaraniPregledService.nadjiPoPacijentu(korisnik.id).subscribe({
                next: pregledi=>{this.zakazaniPregledi=pregledi;
                

                    for(let pregled of this.zakazaniPregledi){
                        this.lekarService.findLekar(pregled.idLekara).subscribe({
                            next: lekar=>{this.lekari.push(lekar);}
                        });
                    

                   
                        this.klinikaService.vratiKlinikuPoId(pregled.idKlinike).subscribe({
                            next: klinika=>{this.klinike.push(klinika);}
                        });
                    }
                }
            });
        }
          });
          this.index=this.zakazaniPregledi.length;
    }
   

    oceni(lekar:Lekar){
        this.lekarService.oceniLekara(lekar).subscribe();
    }

    oceniKliniku(k:Klinika){
        this.klinikaService.oceniKliniku(k).subscribe();
    }

    kraj(){
        this.router.navigate(["/login"]);
    }
  
}