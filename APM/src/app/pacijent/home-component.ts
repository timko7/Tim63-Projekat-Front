import {Component, OnInit} from '@angular/core';
import{Pacijent} from '../pacijent/pacijent';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServces } from '../login/login.services';


@Component({

    selector: 'home-component',
    templateUrl : './home-page.html'

})

export class HomeComponent implements OnInit{


    ngOnInit(): void {
        this.preuzmiPodatke();
    }
   
    pacijent : Pacijent;
    request:Request;
    
    constructor(private route:ActivatedRoute,private router:Router,private paciejentService:LoginServces){
        this.pacijent=new Pacijent();
    }
    preuzmiPodatke(){
        this.paciejentService.getKorisnika().subscribe({
            next: pacijent=>{ this.pacijent=pacijent;

            }
        })

    }

    logOut(){
        this.paciejentService.IzlogujSe(this.request).subscribe(result=>this.kraj());
    }
    kraj(){
        this.router.navigate(["/login"]);
    }
  
}