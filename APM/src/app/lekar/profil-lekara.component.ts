import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServces } from '../login/login.services';
import { LekarServces } from './lekar.services';
import { Lekar } from './lekar';
import { Korisnik } from '../login/Korisnik';


@Component({

    templateUrl : './profil-lekara.html',
    styleUrls: ['./profil-lekara.component.css']

})

export class ProfilLekaraComponent implements OnInit{

    mozesDaMenjas:boolean=false;
    lekartZaIzmenu:Lekar;
    korisnik:Korisnik;
    lekar:Lekar;
    request:Request;

    mozesDaMenjasPass: boolean = false;
    stariPassword: string;
    noviPassword: string;
    promenioPass: boolean = false;
    greskaZaPass: boolean = false;

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
                if(this.korisnik == null) {
                    this.router.navigate(["/welcome"]);
                  }
                this.lekarService.findLekar(this.korisnik.id).subscribe({
                   next:lekar=>{
                       this.lekar=lekar;
                       if(this.lekar.prviPutLogovan == true) {
                            alert("Prvi put ste ulogovani!\nMolimo promenite lozinku!");
                       }
                    }
                })
            }
        })
        

    }
    izmeni(novi:Lekar){
        this.mozesDaMenjas=true;
        this.mozesDaMenjasPass = false;
        this.greskaZaPass = false;
        this.lekartZaIzmenu=novi;

    }
    izmeniLekara(){
        this.lekarService.update(this.lekartZaIzmenu).subscribe();
        this.mozesDaMenjas=false;
    }

    izmeniPassword() {
        this.mozesDaMenjasPass = true;
        this.mozesDaMenjas = false;
        this.greskaZaPass = false;
        this.stariPassword = "";
        this.noviPassword = "";
    }


    onSubmitIzmeniPass() {
      if(this.stariPassword == this.lekar.password) {
          this.lekarService.promeniLozinku(this.lekar.id, this.noviPassword).subscribe(()=>this.krajIzmene());
          this.mozesDaMenjasPass = false;
      } else {
        this.greskaZaPass = true;
      }
    }

    krajIzmene(): void {
        this.promenioPass = true;
        alert("Promenili ste lozinku.\nMolimo ulogujte se ponovo.")
        this.logOut();
    }



    
    logOut(){
        if(this.lekar.prviPutLogovan == true && this.promenioPass == false) {
            alert("Prvi put ste ulogovani i niste promenili lozinku!\nMolimo promenite lozinku!");
        } 
        else {
            this.pacijentService.IzlogujSe(this.request).subscribe(result=>this.kraj());
        }

    }
    kraj(){
        window.location.reload();
        this.router.navigate(["/welcome"]);
    }
    ponisti() {
        this.mozesDaMenjas = false;
    }

    onBack() {
        this.router.navigate(["./lekar"]);
    }
  
}