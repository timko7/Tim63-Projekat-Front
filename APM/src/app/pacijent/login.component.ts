
import {Component, OnInit} from '@angular/core';
import{Pacijent} from '../pacijent/pacijent';
import { ActivatedRoute, Router } from '@angular/router';
import{PacijentServces} from '../pacijent/pacijent.services';



@Component({

    selector: 'login-component',
    templateUrl : './login.html',
    //styleUrls: []

})

export class LoginComponent implements OnInit{
    
    
    email: string;
    password: string;
    
    constructor(private router:Router,private paciejentService:PacijentServces){
    }

    ngOnInit(): void {

    }

    login(): void {
        
    }

}