import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogOutServces } from './logout.services';







@Component({

    selector: 'logout-component',

})

export class LogOutComponent {
   
    sesija:Response;

    constructor(private route:ActivatedRoute,private router:Router,private logoutServise:LogOutServces){
     
    }
    
    
   
  
}