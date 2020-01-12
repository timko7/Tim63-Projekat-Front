import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../login/Korisnik';
import { LoginServces } from '../login/login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'kc-dobrodosli',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
    
    korisnik: Korisnik;
    
    constructor(private router:Router, private loginService:LoginServces){
      this.korisnik=new Korisnik();
      
    }
    
    ngOnInit(): void {
        this.vratiKorisnika();
    }

    vratiKorisnika(){

        this.loginService.getKorisnika().subscribe({next: korisnik=>{
            this.korisnik=korisnik;
            
            if(this.korisnik != null) {
                if(this.korisnik.uloga=="PACIJENT") {
                    this.router.navigate(["/homePagePacijent"]);
                }
                else if(this.korisnik.uloga=="ADMINKLINIKE"){
                    this.router.navigate(["/adminKlinike"]);
                }
            }   
        }
    });
    }
}





