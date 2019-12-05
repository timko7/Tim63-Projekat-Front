import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Klinika } from '../klinika/klinika';
import { KlinikaServices } from '../klinika/klinika.services';



@Component({
  templateUrl: './listaKlinika.html',

})
export class ListaKlinikaComponent implements OnInit{

  klinike:Klinika[]=[];
  filtriraneKlinike:Klinika[];
  


  constructor(private _router: Router,private klinikaService:KlinikaServices) {
   }

   _imeKlinike:string;
  get imeKlinike():string{
    return this._imeKlinike;
  }

  set imeKlinike(value:string){
    this._imeKlinike=value;
    this.filtriraneKlinike= this.imeKlinike ? this.filtriraj(this.imeKlinike):this.klinike;
  }
  
  filtriraj(poljeZaFilter:string):Klinika[]{
    poljeZaFilter=poljeZaFilter.toLowerCase();
    return this.klinike.filter((klinika:Klinika)=>klinika.ime.toLowerCase().indexOf(poljeZaFilter)!=-1);

  }

  ngOnInit() {
    this.klinikaService.findAll().subscribe( {
      next:klinike=>{this.klinike=klinike}
    });
    this.filtriraneKlinike=this.klinike;
    
       
    
  }
  onBack(): void {
    this._router.navigate(['/homePagePacijent']);
  }
  preuzmiZaPretragu():Klinika{
      for(let klinika of this.klinike){
        if(klinika.ime==this.imeKlinike)
            return klinika;
      }
      
  }

}