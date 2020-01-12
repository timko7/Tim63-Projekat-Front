import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServces } from '../login/login.services';
import { LekarServces } from './lekar.services';
import { Lekar } from './lekar';
import { Korisnik } from '../login/Korisnik';


@Component({

    templateUrl : './profil-lekara.html'

})

export class ProfilLekaraComponent implements OnInit{

    mozesDaMenjas:boolean=false;
    lekartZaIzmenu:Lekar;
    korisnik:Korisnik;
    lekar:Lekar;
    request:Request;

   

    ngOnInit(): void {
       
        this.preuzmiPodatke();
    }
   
   
    
    constructor(private route:ActivatedRoute,private router:Router,private pacijentService:LoginServces,private lekarService:LekarServces){
        this.korisnik=new Korisnik();
        this.lekar=new Lekar();
    }

    preuzmiPodatke(){
        this.pacijentService.getKorisnika().subscribe({
            next: korisnik=>{this.korisnik=korisnik;
                this.lekarService.findLekar(this.korisnik.id).subscribe({
                   next:lekar=>{this.lekar=lekar;}
                })
            }
        })
        

    }
    izmeni(novi:Lekar){
        this.mozesDaMenjas=true;
        this.lekartZaIzmenu=novi;

    }
    izmeniLekara(){
        this.lekarService.update(this.lekartZaIzmenu).subscribe();
        this.mozesDaMenjas=false;
    }
    
    logOut(){
        this.pacijentService.IzlogujSe(this.request).subscribe(result=>this.kraj());
    }
    kraj(){
        this.router.navigate(["/login"]);
    }
  
}