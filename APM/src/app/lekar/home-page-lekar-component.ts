import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Lekar } from './lekar';
import { LekarServces } from './lekar.services';



@Component({
  templateUrl: './home-page-lekar.html',
  styleUrls: ['home-page-lekar.css']

})
export class HomePageLekarComponent{

  lekar: Lekar;



  constructor(private _router: Router, private LekarSevice: LekarServces) {
    this.lekar = new Lekar();
   }

  ngOnInit() {
    this.LekarSevice.getLekaraKlinike().subscribe({
      next: lekar=>{
          this.lekar=lekar;
          console.log('Lekar', this.lekar);
          /*if(this.admin.prviPutLogovan == true) {
            alert("Prvi put ste ulogovani!\nMolimo promenite lozinku!");
          }*/
          /*this.klinikaServis.getKlinika(this.admin.idKlinike).subscribe({
            next: klinika => {
              this.klinika = klinika;
            }
          });*/
      }
    });
    
  }
}