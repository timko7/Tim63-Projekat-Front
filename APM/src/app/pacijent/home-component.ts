import {Component, OnInit} from '@angular/core';
import{Pacijent} from '../pacijent/pacijent';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServces } from '../login/login.services';
import { PacijentServces } from './pacijent.services';


@Component({

    selector: 'home-component',
    templateUrl : './home-page.html'

})

export class HomeComponent implements OnInit{

    mozesDaMenjas:boolean=false;
    pacijentZaIzmenu:Pacijent;
    pacijent : Pacijent;
    request:Request;

    ngOnInit(): void {
        this.preuzmiPodatke();
    }
   
   
    
    constructor(private route:ActivatedRoute,private router:Router,private paciejentService:LoginServces,private ser:PacijentServces){
        this.pacijent=new Pacijent();
    }
    preuzmiPodatke(){
        this.paciejentService.getKorisnika().subscribe({
            next: pacijent=>{ this.pacijent=pacijent;

            }
        })

    }
    izmeni(novi:Pacijent){
        this.mozesDaMenjas=true;
        this.pacijentZaIzmenu=novi;

    }
    izmeniPacijenta(){
        this.ser.update(this.pacijentZaIzmenu).subscribe();
        this.mozesDaMenjas=false;
    }

    logOut(){
        this.paciejentService.IzlogujSe(this.request).subscribe(result=>this.kraj());
    }
    kraj(){
        this.router.navigate(["/login"]);
    }
  
}