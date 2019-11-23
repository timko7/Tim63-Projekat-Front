import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lekar } from './lekar';
import { LekarServces } from './lekar.services';

@Component({

    selector: 'lekar-component',
    templateUrl : './dodavanjeLekara.html'

})

export class LekarComponent{
    
    lekar: Lekar;
    
    constructor(private route:ActivatedRoute,private router:Router,private lekarService:LekarServces){
        this.lekar=new Lekar();
    }

    onSubmit() {
      
    
        this.lekarService.save(this.lekar).subscribe(result => this.gotoUserList());
        alert("sacuvan korisnik "+this.lekar.ime+""+this.lekar.prezime)
        this.lekar.ime="";
        this.lekar.prezime="";
        this.lekar.email="";
        this.lekar.password="";
        this.lekar.grad="";
        this.lekar.drzava="";
        this.lekar.adresa="";
        this.lekar.telefon="";
        this.lekar.broj_osiguranika=null;

      }
     
      gotoUserList() {
       
      }

    

}