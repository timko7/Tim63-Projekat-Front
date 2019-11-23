import {Component} from '@angular/core';
import{Pacijent} from '../pacijent/pacijent';
import { ActivatedRoute, Router } from '@angular/router';
import{PacijentServces} from '../pacijent/pacijent.services';


@Component({

    selector: 'home-component',
    templateUrl : './home-page.html'

})

export class HomeComponent{
    pacijent : Pacijent
    
    constructor(private route:ActivatedRoute,private router:Router,private paciejentService:PacijentServces){
        this.pacijent=new Pacijent();
    }
  
}