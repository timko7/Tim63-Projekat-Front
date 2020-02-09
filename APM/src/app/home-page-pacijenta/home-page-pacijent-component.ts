import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';



@Component({
  templateUrl: './home-page-pacijent.html',
  styleUrls: ['./home-page-pacijent.css']

})
export class HomePagePacijentComponent{

  //nazivAdmina: string = "Pera Peric(hardcore)";



  constructor(private _router: Router) { }

  ngOnInit() {
    
  }
}