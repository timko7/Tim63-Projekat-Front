import { Component } from '@angular/core';
import { Klinika } from './klinika';
import { ActivatedRoute, Router } from '@angular/router';
import { KlinikaServices } from './klinika.services';

@Component({

    selector: 'klinika-component',
    templateUrl : './dodavanjeKlinike.html'

})

export class KlinikaComponent{
    
    klinika: Klinika;
    
    constructor(private route:ActivatedRoute,private router:Router, private klinikaService: KlinikaServices){
        this.klinika=new Klinika();
    }

    onSubmit() {
      
    
        this.klinikaService.save(this.klinika).subscribe(result => this.gotoUserList());
        
        this.klinika.ime="";
        this.klinika.opis="";
        this.klinika.adresa="";
      }
     
      gotoUserList() {
       
      }

    

}