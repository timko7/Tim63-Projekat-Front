import {Component} from '@angular/core';
import{Pacijent} from '../pacijent/pacijent';
import { ActivatedRoute, Router } from '@angular/router';
import{PacijentServces} from '../pacijent/pacijent.services';



@Component({

    selector: 'pacijent-component',
    templateUrl : './registracija.html'

})

export class PacijentComponent{
    
    pacijent: Pacijent;
    
    constructor(private route:ActivatedRoute,private router:Router,private paciejentService:PacijentServces){
        this.pacijent=new Pacijent();
    }

    onSubmit() {
      
    
        this.paciejentService.save(this.pacijent).subscribe(result => this.gotoUserList());
        alert("sacuvan korisnik "+this.pacijent.ime+""+this.pacijent.prezime)
        this.pacijent.ime="";
        this.pacijent.prezime="";
        this.pacijent.email="";
        this.pacijent.password="";
        this.pacijent.grad="";
        this.pacijent.drzava="";
        this.pacijent.adresa="";
        this.pacijent.telefon="";
        this.pacijent.broj_osiguranika="";
        this.router.navigate(["/homePage"]);

      }
     
      gotoUserList() {
       
      }

    

}