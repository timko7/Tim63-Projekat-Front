
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from './login';
import { LoginServces } from './login.services';
import { Korisnik } from './Korisnik';
import { Observable } from 'rxjs';



@Component({

    //selector: 'login-component',
    templateUrl : './login.html',
    //styleUrls: []

})


export class LoginComponent implements OnInit{
    korisnik:Korisnik;
    respnse:Response;
    
   loginZahtev:Login;
    
    constructor(private router:Router,private loginService:LoginServces){
        this.loginZahtev=new Login();
      this.korisnik=new Korisnik();
      
    }

    ngOnInit() {
  
}


    login(){
        
        this.loginService.ulogujSe(this.loginZahtev).subscribe(result=>this.vratiKorisnika());
      
    }

    vratiKorisnika(){

        this.loginService.getKorisnika().subscribe({next: korisnik=>{
            this.korisnik=korisnik;

            console.log(this.korisnik.uloga);

              if(this.korisnik.uloga=="PACIJENT"){
                this.router.navigate(["/homePagePacijent"]);
                 }
                   else if(this.korisnik.uloga=="ADMINKLINIKE"){
                      this.router.navigate(["/adminKlinike"]);
                  } 
                  else if(this.korisnik.uloga=="LEKAR"){
                    this.router.navigate(["/lekar"]);
                }
                  else{
                     this.router.navigate(["/signup"]);
                  }
                 
              
        }

        });
    
    }
       
      

}